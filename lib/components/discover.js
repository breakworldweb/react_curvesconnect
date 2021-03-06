// Generated by CoffeeScript 1.10.0
(function() {
  var $l, AdvancedCriteriaTable, EditableSection, LookingForTable, ProfileContent, React, Section, _, createFactory, d, moment, stores,
    slice = [].slice;

  _ = require('lodash');

  React = require('react');

  d = _.merge(React.DOM, require('./common'), require('./canvas'), require('./profile_list'));

  createFactory = d.createFactory;

  stores = require('./stores');

  $l = require('./locale');

  moment = require('moment');

  ProfileContent = createFactory({
    value: function() {
      if (this.refs.textarea == null) {
        return this.props.children;
      }
      return this.refs.textarea.value();
    },
    render: function() {
      if (this.props.editMode) {
        return d.AutoGrowTextArea({
          ref: 'textarea',
          defaultValue: this.props.children
        });
      } else {
        return d.span({}, this.props.children);
      }
    }
  });

  AdvancedCriteriaTable = createFactory({
    value: function() {
      return _.merge({}, this.props.children, this.state);
    },
    handleChange: function(field, e) {
      var value;
      value = $(e.target).val();
      return this.setState(_.object([[field, value]]));
    },
    render: function() {
      return d.div.apply(d, [{}].concat(slice.call(_.map(this.props.children, (function(_this) {
        return function(v, k) {
          var options, ref, rendered;
          if (((ref = _this.state) != null ? ref[k] : void 0) != null) {
            v = _this.state[k];
          }
          rendered = {
            label: $l("advancedCriteria." + k),
            value: (v != null) && v !== '' ? $l("options." + k + "." + v) || v : void 0
          };
          options = $l("options." + k);
          if (_this.props.editMode) {
            if (_.isObject(options)) {
              rendered.value = d.select.apply(d, [{
                ref: k,
                value: v,
                onChange: _this.handleChange.bind(null, k)
              }, d.option({}, "")].concat(slice.call(_.map(options, function(label, option) {
                return d.option({
                  value: option
                }, label);
              }))));
            } else {
              rendered.value = d.input({
                ref: k,
                value: rendered.value,
                onChange: _this.handleChange.bind(null, k)
              });
            }
          }
          if (((rendered.value != null) && rendered.value !== '') || _this.props.editable) {
            return d.DescriptionList({
              label: rendered.label
            }, rendered.value);
          }
        };
      })(this)))));
    }
  });

  EditableSection = function(focusProps) {
    return function(Component) {
      return createFactory({
        handleEdit: function() {
          this.setState({
            editMode: true
          });
          if (focusProps.focusOn != null) {
            return focusProps.focusOn(this.refs.section.getDOMNode());
          }
        },
        handleCancel: function() {
          this.setState({
            editMode: false
          });
          if (focusProps.unfocus != null) {
            return focusProps.unfocus();
          }
        },
        handleSave: function() {
          this.setState({
            editMode: false
          });
          if (this.props.onChange != null) {
            this.props.onChange(this.refs.component.value());
          }
          if (focusProps.unfocus != null) {
            return focusProps.unfocus();
          }
        },
        componentDidMount: function() {
          return $(this.refs.section.getDOMNode()).resize((function(_this) {
            return function() {
              if (focusProps.onResize != null) {
                return focusProps.onResize();
              }
            };
          })(this));
        },
        render: function() {
          var ref, ref1, ref2;
          return d.div({
            ref: 'section',
            className: this.props.className + " " + (((ref = this.state) != null ? ref.editMode : void 0) ? 'edit-mode' : '')
          }, EditLabel({
            onEdit: this.props.onEdit || this.handleEdit,
            editMode: (ref1 = this.state) != null ? ref1.editMode : void 0,
            onCancel: this.handleCancel,
            onSave: this.handleSave
          }, this.props.label), Component(_.defaults({
            ref: 'component',
            editMode: (ref2 = this.state) != null ? ref2.editMode : void 0,
            editable: true
          }, this.props), this.props.children));
        }
      });
    };
  };

  Section = function(Component) {
    return createFactory({
      render: function() {
        return d.div({
          className: this.props.className
        }, this.props.label ? d.h3({}, this.props.label) : void 0, Component(_.defaults({
          ref: 'component'
        }, this.props), this.props.children));
      }
    });
  };

  LookingForTable = createFactory({
    value: function() {
      return _.merge({}, this.props.children, this.state);
    },
    handleChange: function(e) {
      var field, value;
      value = $(e.target).val();
      field = $(e.target).attr('name');
      return this.setState(_.object([[field, value]]));
    },
    render: function() {
      var ref, ref1, ref2, ref3, ref4;
      if (this.props.editMode) {
        return d.BulletList.apply(d, [{}].concat(slice.call([
          d.DropDown({
            name: 'gender',
            value: ((ref = this.state) != null ? ref.gender : void 0) || this.props.children.gender,
            onChange: this.handleChange
          }, $l("gender_plural")), d.span({}, "Between ", d.DropDown({
            name: 'minAge',
            value: ((ref1 = this.state) != null ? ref1.minAge : void 0) || this.props.children.minAge,
            onChange: this.handleChange
          }, ages), " and ", d.DropDown({
            name: 'maxAge',
            value: ((ref2 = this.state) != null ? ref2.maxAge : void 0) || this.props.children.maxAge,
            onChange: this.handleChange
          }, ages)), d.DropDown({
            name: 'distance',
            value: ((ref3 = this.state) != null ? ref3.distance : void 0) || this.props.children.distance,
            onChange: this.handleChange
          }, $l("options.distance")), d.DropDown({
            name: 'relationshipType',
            value: ((ref4 = this.state) != null ? ref4.relationshipType : void 0) || this.props.children.relationshipType,
            onChange: this.handleChange
          }, $l("options.relationshipType"))
        ])));
      } else {
        return d.BulletList.apply(d, [{}].concat(slice.call([$l("gender_plural." + this.props.children.gender), d.span.apply(d, [{}].concat(slice.call(["Between ", d.span({}, this.props.children.minAge), " and ", d.span({}, this.props.children.maxAge)]))), $l("options.distance." + this.props.children.distance), $l("options.relationshipType." + this.props.children.relationshipType)])));
      }
    }
  });

  exports.Discover = createFactory({
    getDefaultProps: function() {
      return {
        store: new stores.DiscoverStore()
      };
    },
    handleChange: function(section, values) {
      var updates;
      updates = _.object([[section, values]]);
      this.props.restClient.post('', updates);
      return this.setState(updates);
    },
    handleViewProfile: function() {
      return this.props.onChangePath("/profile/" + (this.props.store.getCurrentProfile().guid));
    },
    goprofileClick: function(profile) {
      return this.props.onChangePath("/myprofile");
    },
    handleSendMessage: function() {
      return this.props.onChangePath("/conversation/" + (this.props.store.getCurrentProfile().guid));
    },
    componentWillMount: function() {
      return this.props.store.preload(this.props.items, this.props.totalFound);
    },
    componentDidMount: function() {
      this.props.store.on('change', this.handleChange);
      return this.props.store.setRestClient(this.props.restClient);
    },
    componentWillUnmount: function() {
      return this.props.store.removeListener('change', this.handleChange);
    },
    render: function() {
      var profile, ref, ref1, ref2, ref3, ref4, ref5, section, status;
      profile = this.props.store.getCurrentProfile();
      status = this.props.store.getStatus();
      section = this.props.editable ? EditableSection({
        focusOn: (function(_this) {
          return function(element) {
            return _this.refs.focusSection.focus(element);
          };
        })(this),
        unfocus: (function(_this) {
          return function() {
            return _this.refs.focusSection.unfocus();
          };
        })(this),
        onResize: (function(_this) {
          return function() {
            return _this.refs.focusSection.handleWindowResize();
          };
        })(this)
      }) : Section;
      return d.div({
        className: 'outer-container'
      }, d.div({
        className: 'inner-container'
      }, d.Button({
        className: 'finish_profile',
        onClick: this.goprofileClick
      }, d.span({}, $l('tooltips.goprofile')), d.Glyph({
        glyph: 'arrow-right'
      })), d.div({
        className: 'discover'
      }, status === 'loading' ? d.div({
        className: 'loading'
      }, d.span({}, $l('loading'))) : status === 'empty' ? d.div({
        className: 'empty'
      }, d.span({}, $l('emptyDiscover'))) : void 0, d.div({
        className: 'random_title'
      }, d.span(), "Random Match"), d.div({
        className: 'photos'
      }, d.div({
        className: 'current'
      }, d.div({
        className: 'photo',
        style: {
          backgroundImage: "url(" + (profile != null ? (ref = profile.primaryPhoto) != null ? ref.cdnBaseUrl : void 0 : void 0) + (profile != null ? (ref1 = profile.primaryPhoto) != null ? (ref2 = ref1.urls) != null ? ref2['300x300'] : void 0 : void 0 : void 0) + ")"
        }
      })), d.div({
        className: 'buttons'
      }, d.Button({
        className: "like-profile square",
        onClick: (function(_this) {
          return function() {
            _this.props.store.like();
          };
        })(this)
      }, d.Glyph({
        glyph: 'star'
      }), d.span({
        className: 'button-label'
      }, "Like")), d.Button({
        className: "send-message square",
        onClick: this.handleSendMessage
      }, d.Glyph({
        glyph: 'comment'
      }), d.span({
        className: 'button-label'
      }, "Message")), d.Button({
        className: "send-message square",
        onClick: this.handleViewProfile
      }, d.Glyph({
        glyph: 'comment'
      }), d.span({
        className: 'button-label'
      }, "View")), d.Button({
        className: "hide-profile square",
        onClick: (function(_this) {
          return function() {
            _this.props.store.hide();
          };
        })(this)
      }, d.Glyph({
        glyph: 'share'
      }), d.span({
        className: 'button-label'
      }, "Skip")))), d.div.apply(d, [{
        className: "content-and-details " + ((((profile != null ? (ref5 = profile.content) != null ? ref5.length : void 0 : void 0) != null) || 0) === 0 ? 'no-content' : 'has-content')
      }].concat(slice.call([
        d.div.apply(d, [{
          className: 'content'
        }].concat(slice.call(_.map(profile.content || [], (function(_this) {
          return function(item) {
            var ref3;
            return section(ProfileContent)({
              className: 'item',
              label: $l("content." + item.type),
              onChange: _this.handleChangeContent.bind(null, item.type)
            }, ((ref3 = _this.state) != null ? ref3["content_" + item.type] : void 0) || item.content);
          };
        })(this))))), d.div({
          className: 'details'
        }, section(LookingForTable)({
          className: 'looking-for',
          label: 'Looking For',
          onChange: this.handleChange.bind(null, 'lookingFor')
        }, _.merge({}, profile.lookingFor, (ref3 = this.state) != null ? ref3.lookingFor : void 0)), section(AdvancedCriteriaTable)({
          className: 'my-details',
          label: 'My Details',
          onChange: this.handleChange.bind(null, 'advancedCriteria')
        }, _.merge({}, profile.advancedCriteria, ((ref4 = this.state) != null ? ref4.advancedCriteria : void 0) || {})))
      ]))))));
    }
  });

}).call(this);

//# sourceMappingURL=discover.js.map
