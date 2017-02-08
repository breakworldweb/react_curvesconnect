// Generated by CoffeeScript 1.10.0
(function() {
  var C, D, React, _, createFactory, defaults, localCookies,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    slice = [].slice;

  React = require('react');

  D = React.DOM;

  _ = require('lodash');

  defaults = {};

  createFactory = function(def) {
    return React.createFactory(React.createClass(_.defaults({}, def, defaults)));
  };

  localCookies = void 0;

  module.exports = C = {
    createFactory: createFactory,
    setCookies: function(cookies) {
      return localCookies = cookies;
    },
    getCookies: function() {
      return _.clone(localCookies);
    },
    formToObj: function(form) {
      return Object.keys(form).reduce((function(output, key) {
        var currentPath, parentKey, pathKey, paths;
        parentKey = key.match(/[^\[]*/i);
        paths = key.match(/\[.*?\]/g) || [];
        paths = [parentKey[0]].concat(paths).map(function(key) {
          return key.replace(/\[|\]/g, '');
        });
        currentPath = output;
        while (paths.length) {
          pathKey = paths.shift();
          if ((indexOf.call(currentPath, pathKey) >= 0)) {
            currentPath = currentPath[pathKey];
          } else {
            currentPath[pathKey] = paths.length ? isNaN(paths[0]) ? {} : [] : form[key];
            currentPath = currentPath[pathKey];
          }
        }
        return output;
      }), {});
    },
    Button: createFactory({
      getInitialState: function() {
        return {
          disabled: this.props.disabled
        };
      },
      disable: function() {
        return this.setState({
          disabled: true
        });
      },
      enable: function() {
        return this.setState({
          disabled: false
        });
      },
      handleClick: function(e) {
        if (this.props.onClick != null) {
          e.preventDefault();
          if (!this.state.disabled) {
            return this.props.onClick(e);
          }
        }
      },
      render: function() {
        return D.div({
          ref: 'container',
          className: "button " + this.props.className + " " + (this.state.disabled ? 'disabled' : '')
        }, D.a({
          href: this.props.href || "#",
          onClick: this.handleClick
        }, this.props.children));
      }
    }),
    DescriptionList: createFactory({
      render: function() {
        return D.dl({
          className: this.props.className
        }, D.dt({}, this.props.label), D.dd({}, this.props.children || this.props.value));
      }
    }),
    Bullet: createFactory({
      render: function() {
        return D.span({
          className: 'bullet'
        }, "•");
      }
    }),
    BulletList: createFactory({
      render: function() {
        return D.ul.apply(D, [{
          className: this.props.className
        }].concat(slice.call(_.map(this.props.children, function(child) {
          return D.li({}, child);
        }))));
      }
    }),
    Glyph: createFactory({
      render: function() {
        return D.i({
          className: "fa fa-" + this.props.glyph + " fa-fw"
        });
      }
    }),
    FileUploader: createFactory({
      propTypes: {
        name: React.PropTypes.string.isRequired,
        accept: React.PropTypes.string,
        capture: React.PropTypes.bool
      },
      pickFile: function() {
        return $(this.refs.chooseFile.getDOMNode()).click();
      },
      handleUploadFile: function(e) {
        var file, ie, ref, ref1, xhr;
        e.preventDefault();
        if (navigator.userAgent.indexOf('MSIE') >= 0 || navigator.appVersion.indexOf('Trident/') > 0) {
          ie = true;
          xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } else {
          ie = false;
          xhr = new XMLHttpRequest();
        }
        file = (ref = e.target) != null ? (ref1 = ref.files) != null ? ref1[0] : void 0 : void 0;
        if (!(xhr.upload && (file != null))) {
          return $(this.refs.uploadForm.getDOMNode()).submit();
        }
        xhr.upload.addEventListener("progress", ((function(_this) {
          return function(e) {
            var pc;
            pc = parseInt(e.loaded / e.total * 100);
            if (_this.props.onProgress != null) {
              return _this.props.onProgress(pc);
            }
          };
        })(this)), false);
        xhr.onreadystatechange = (function(_this) {
          return function(e) {
            var err, error, ref2, result, success;
            if (xhr.readyState === 4) {
              success = xhr.status === 200;
              try {
                result = JSON.parse(e.target.response);
              } catch (error) {
                err = error;
                success = false;
                result = (ref2 = e.target) != null ? ref2.response : void 0;
              }
              if (_this.props.onComplete != null) {
                return _this.props.onComplete(success, result);
              }
            }
          };
        })(this);
        xhr.open("POST", this.props.url || document.location, true);
        if (ie) {
          xhr.setRequestHeader("Content-Type", "multipart/form-data");
          xhr.setRequestHeader("X-File-Name", file.name);
          xhr.setRequestHeader("X-File-Size", file.size);
          xhr.setRequestHeader("X-File-Type", file.type);
        }
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', file.type || "image/binary");
        if (this.props.fileNameHeader != null) {
          xhr.setRequestHeader(this.props.fileNameHeader, file.name);
        }
        xhr.setRequestHeader("local-cookies", JSON.stringify(localCookies));
        return xhr.send(file);
      },
      render: function() {
        return D.form.apply(D, [{
          url: this.props.url,
          method: 'post',
          encType: "multipart/form-data",
          ref: 'uploadForm',
          style: {
            display: 'none'
          }
        }].concat(slice.call(_.map(this.props.parameters || {}, (function(_this) {
          return function(v, k) {
            return D.input({
              type: 'hidden',
              name: k,
              value: v
            });
          };
        })(this))), [D.input(_.merge({
          ref: 'chooseFile',
          type: 'file',
          onChange: this.handleUploadFile
        }, this.props))]));
      }
    }),
    AutoGrowTextArea: createFactory({
      value: function() {
        return $(this.refs.textarea.getDOMNode()).val();
      },
      componentDidMount: function() {
        return $(this.refs.textarea.getDOMNode()).autogrow({
          vertical: true,
          horizontal: false,
          flickering: false
        });
      },
      render: function() {
        return D.textarea(_.merge({
          ref: 'textarea'
        }, _.omit(this.props, 'children')), this.props.children);
      }
    }),
    DropDown: createFactory({
      render: function() {
        var items;
        if (_.isArray(this.props.children)) {
          items = this.props.children;
        } else {
          items = _.map(this.props.children, function(label, value) {
            return {
              label: label,
              value: value
            };
          });
        }
        return D.select.apply(D, [this.props].concat(slice.call(_.map(items, (function(_this) {
          return function(option) {
            return D.option({
              value: option.value
            }, option.label);
          };
        })(this)))));
      }
    }),
    LabeledField: createFactory({
      render: function() {
        return D.div.apply(D, [{
          className: "field" + (this.props.type != null ? ' field-' + this.props.type : '') + " field-" + this.props.name
        }].concat(slice.call([
          D.label({
            htmlFor: "field-" + this.props.name
          }, this.props.label || this.props.placeholder), this.props.errorMessage != null ? D.div({
            className: "field-error-message"
          }, this.props.errorMessage) : void 0, this.props.children
        ])));
      }
    }),
    InputField: createFactory({
      render: function() {
        return C.LabeledField(this.props, D.input({
          id: "field-" + this.props.name,
          name: this.props.name,
          type: this.props.type,
          placeholder: this.props.placeholder || this.props.label,
          value: this.props.value,
          defaultValue: this.props.defaultValue,
          checked: this.props.checked,
          onChange: this.props.onChange,
          maxLength: this.props.maxLength,
          max: this.props.max,
          min: this.props.min
        }));
      }
    }),
    SelectField: createFactory({
      render: function() {
        return C.LabeledField(this.props, D.select.apply(D, [{
          name: this.props.name,
          placeholder: this.props.placeholder || this.props.label,
          value: this.props.defaultValue,
          onChange: this.props.onChange
        }].concat(slice.call(_.map(this.props.options, (function(_this) {
          return function(option) {
            return D.option({
              value: option.value
            }, option.label);
          };
        })(this))))));
      }
    }),
    FormFieldLabel: createFactory({
      render: function() {
        var ref;
        return D.label.apply(D, [{
          htmlFor: this.props.htmlFor
        }].concat(slice.call([
          D.span({
            className: 'label-text'
          }, this.props.label), ((ref = this.props.validationErrors) != null ? ref[0] : void 0) != null ? D.span({
            className: 'label label-danger'
          }, "" + this.props.validationErrors[0]) : void 0
        ])));
      }
    }),
    FormFieldContainer: createFactory({
      render: function() {
        var ref, validationClass;
        validationClass = ((ref = this.props.validationErrors) != null ? ref[0] : void 0) != null ? 'has-error' : (this.props.value != null) && this.props.value !== "" ? 'has-success' : "";
        return D.div({
          className: "form-group " + validationClass
        }, this.props.children);
      }
    }),
    FormField: createFactory({
      handleChange: function(e) {
        var value;
        value = $(e.target).val();
        return this.props.valueLink.requestChange(value);
      },
      validateValue: function(value) {
        var errors, filter, parseRegexp;
        if (value == null) {
          value = "";
        }
        parseRegexp = function(regex) {
          if (regex.test != null) {
            return regex;
          }
          regex = regex.split(/^\/|\/(?=[a-z]*$)/);
          if (regex[0] === "") {
            regex.shift();
          }
          return (function(func, args, ctor) {
            ctor.prototype = func.prototype;
            var child = new ctor, result = func.apply(child, args);
            return Object(result) === result ? result : child;
          })(RegExp, regex, function(){});
        };
        if (this.props.def.filter != null) {
          filter = parseRegexp(this.props.def.filter);
          value = value.replace(filter, '');
        }
        errors = [];
        _.each(this.props.def.validators || {}, function(regex, message) {
          if (_.isFunction(regex)) {
            return;
          }
          regex = parseRegexp(regex);
          if (regex.test(value) !== true) {
            return errors.push(message);
          }
        });
        if (!(errors.length > 0)) {
          errors = null;
        }
        return errors;
      },
      render: function() {
        var def, validationErrors;
        def = this.props.def;
        defaults = {
          className: "form-control",
          id: "input_" + this.props.name,
          name: this.props.name,
          placeholder: def.placeholder || def.label,
          defaultValue: this.props.value,
          onChange: this.handleChange
        };
        if (def.type === 'image') {
          return D.img({
            className: 'image-field',
            id: defaults.id,
            src: this.props.value
          });
        }
        validationErrors = this.props.validationErrors || this.validateValue(this.props.value);
        return C.FormFieldContainer.apply(C, [{
          value: this.props.value,
          validationErrors: validationErrors
        }].concat(slice.call([
          def.label != null ? C.FormFieldLabel({
            htmlFor: this.props.name,
            label: def.label,
            validationErrors: validationErrors
          }) : void 0, def.type === 'textarea' ? D.textarea(defaults) : D.input(_.merge(defaults, {
            type: def.type
          }))
        ])));
      }
    }),
    SlidingMenu: createFactory({
      show: function() {
        $(this.refs.menu.getDOMNode()).addClass('visible');
        return $(this.refs.menuContainer.getDOMNode()).css({
          left: 0
        });
      },
      hide: function() {
        return $(this.refs.menu.getDOMNode()).removeClass('visible');
      },
      ignore: function(e) {
        e.preventDefault();
        return e.stopPropagation();
      },
      handleTouchMove: function(e) {
        var $menuBody, $menuContainer, deltaX, deltaY, maxScrollTop;
        deltaX = this.startX - e.changedTouches[0].screenX;
        if (deltaX < 0) {
          deltaX = 0;
        }
        deltaY = this.startY - e.changedTouches[0].screenY;
        if ((this.dirLock == null) && (deltaX !== 0 || deltaY !== 0)) {
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            this.dirLock = 'X';
          } else {
            this.dirLock = 'Y';
          }
        }
        if (this.dirLock === 'X') {
          return $(this.refs.menuContainer.getDOMNode()).css({
            left: -deltaX
          });
        } else if (this.dirLock === 'Y') {
          $menuBody = $(this.refs.menuBody.getDOMNode());
          $menuContainer = $(this.refs.menuContainer.getDOMNode());
          this.scrollTop = this.lastScrollTop + deltaY;
          maxScrollTop = $menuBody.outerHeight() - $menuContainer.innerHeight();
          this.scrollTop = Math.max(this.scrollTop, 0);
          this.scrollTop = Math.min(this.scrollTop, maxScrollTop);
          return $menuBody.css({
            top: -this.scrollTop
          });
        }
      },
      handleTouchStart: function(e) {
        this.dirLock = null;
        this.startX = e.changedTouches[0].screenX;
        this.startY = e.changedTouches[0].screenY;
        return this.lastScrollTop != null ? this.lastScrollTop : this.lastScrollTop = 0;
      },
      handleTouchEnd: function(e) {
        var endX;
        endX = e.changedTouches[0].screenX;
        $(this.refs.menuContainer.getDOMNode()).css({
          left: 0
        });
        if (this.dirLock === 'X' && this.startX - endX > 100) {
          return this.hide();
        } else if (this.dirLock === 'Y') {
          return this.lastScrollTop = this.scrollTop;
        }
      },
      render: function() {
        this.startY = null;
        return D.div({
          ref: 'menu',
          className: 'sliding-menu',
          onClick: this.hide
        }, D.div({
          ref: 'menuContainer',
          className: 'sliding-menu-container',
          onClick: this.ignore,
          onTouchMove: this.handleTouchMove,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd
        }, D.div({
          ref: 'menuBody',
          className: 'sliding-menu-body'
        }, D.ul.apply(D, [{}].concat(slice.call(_.map(this.props.children || [], function(item) {
          return D.li({}, item);
        })))))));
      }
    }),
    DropingMenu: createFactory({
      show: function() {
        $(this.refs.drop.getDOMNode()).addClass('visible');
        return $(this.refs.dropContainer.getDOMNode()).css({
          left: 0
        });
      },
      hide: function() {
        return $(this.refs.drop.getDOMNode()).removeClass('visible');
      },
      ignore: function(e) {
        e.preventDefault();
        return e.stopPropagation();
      },
      handleTouchMove: function(e) {
        var $dropBody, $dropContainer, deltaX, deltaY, maxScrollTop;
        deltaX = this.startX - e.changedTouches[0].screenX;
        if (deltaX < 0) {
          deltaX = 0;
        }
        deltaY = this.startY - e.changedTouches[0].screenY;
        if ((this.dirLock == null) && (deltaX !== 0 || deltaY !== 0)) {
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            this.dirLock = 'X';
          } else {
            this.dirLock = 'Y';
          }
        }
        if (this.dirLock === 'X') {
          return $(this.refs.dropContainer.getDOMNode()).css({
            left: -deltaX
          });
        } else if (this.dirLock === 'Y') {
          $dropBody = $(this.refs.dropBody.getDOMNode());
          $dropContainer = $(this.refs.dropContainer.getDOMNode());
          this.scrollTop = this.lastScrollTop + deltaY;
          maxScrollTop = $dropBody.outerHeight() - $dropContainer.innerHeight();
          this.scrollTop = Math.max(this.scrollTop, 0);
          this.scrollTop = Math.min(this.scrollTop, maxScrollTop);
          return $dropBody.css({
            top: -this.scrollTop
          });
        }
      },
      handleTouchStart: function(e) {
        this.dirLock = null;
        this.startX = e.changedTouches[0].screenX;
        this.startY = e.changedTouches[0].screenY;
        return this.lastScrollTop != null ? this.lastScrollTop : this.lastScrollTop = 0;
      },
      handleTouchEnd: function(e) {
        var endX;
        endX = e.changedTouches[0].screenX;
        $(this.refs.dropContainer.getDOMNode()).css({
          left: 0
        });
        if (this.dirLock === 'X' && this.startX - endX > 100) {
          return this.hide();
        } else if (this.dirLock === 'Y') {
          return this.lastScrollTop = this.scrollTop;
        }
      },
      render: function() {
        this.startY = null;
        return D.div({
          ref: 'drop',
          className: 'droping-menu',
          onClick: this.hide
        }, D.div({
          ref: 'dropContainer',
          className: 'droping-menu-container',
          onClick: this.ignore,
          onTouchMove: this.handleTouchMove,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd
        }, D.div({
          ref: 'dropBody',
          className: 'droping-menu-body'
        }, D.ul.apply(D, [{}].concat(slice.call(_.map(this.props.children || [], function(item) {
          return D.li({}, item);
        })))))));
      }
    }),
    ModalDialog: createFactory({
      show: function(animate, trackHistory) {
        if (trackHistory == null) {
          trackHistory = true;
        }
        if (this.visible) {
          return;
        }
        this.trackHistory = trackHistory;
        if (animate) {
          $(this.refs.dialog.getDOMNode()).addClass('animate');
        }
        $(this.refs.dialog.getDOMNode()).addClass('visible');
        this.visible = true;
        if (((typeof history !== "undefined" && history !== null ? history.pushState : void 0) != null) && this.trackHistory) {
          window.addEventListener('popstate', this.back);
          return history.pushState({}, null);
        }
      },
      back: function() {
        return this.hide(false);
      },
      hide: function(popHistory) {
        if (popHistory == null) {
          popHistory = true;
        }
        this.visible = false;
        $(this.refs.dialog.getDOMNode()).removeClass('visible');
        if (((typeof history !== "undefined" && history !== null ? history.back : void 0) != null) && popHistory && this.trackHistory) {
          history.back();
        }
        if ((typeof history !== "undefined" && history !== null ? history.pushState : void 0) != null) {
          window.removeEventListener('popstate', this.back);
        }
        return setTimeout(((function(_this) {
          return function() {
            if (_this.refs.dialog != null) {
              return $(_this.refs.dialog.getDOMNode()).removeClass('animate');
            }
          };
        })(this)), 500);
      },
      ignore: function(e) {
        e.preventDefault();
        return e.stopPropagation();
      },
      componentWillUnmount: function() {
        return this.hide();
      },
      render: function() {
        return D.div({
          ref: 'dialog',
          className: "modal-dialog " + (this.props.className || "")
        }, D.div({
          className: 'modal-dialog-container'
        }, D.div({
          className: 'modal-dialog-body'
        }, this.props.children)));
      }
    }),
    ProgressBar: createFactory({
      getInitialState: function() {
        return {
          value: 0
        };
      },
      show: function(message, startingValue) {
        this.setState({
          message: message,
          value: startingValue || 0
        });
        return this.refs.dialog.show(false, false);
      },
      setMessage: function(message) {
        return this.setState({
          message: message
        });
      },
      setProgress: function(value) {
        return this.setState({
          value: value
        });
      },
      hide: function() {
        return this.refs.dialog.hide();
      },
      render: function() {
        var value;
        value = Math.min(100, this.state.value);
        return D.ModalDialog({
          ref: 'dialog',
          className: 'progress-bar'
        }, D.div({
          className: 'progress-container'
        }, this.state.message != null ? D.div({
          className: 'message'
        }, this.state.message) : void 0, D.div({
          className: 'value',
          style: {
            right: (100 - value) + "%"
          }
        })));
      }
    }),
    FocusSection: createFactory({
      focus: function(element) {
        this.element = $(element);
        this.container.addClass("visible");
        setTimeout(((function(_this) {
          return function() {
            return _this.container.addClass("do-animate");
          };
        })(this)), 0);
        return this.handleWindowResize();
      },
      unfocus: function() {
        this.container.removeClass("visible");
        this.container.removeClass("do-animate");
        return this.element = null;
      },
      handleWindowResize: function() {
        var width;
        if (this.element == null) {
          return;
        }
        width = $(window).width();
        this.container.css({
          left: -this.container.parent().offset().left,
          width: width
        });
        this.container.find('.left').css({
          width: this.element.offset().left - this.container.offset().left - 2
        });
        this.container.find('.right').css({
          width: width - (this.element.offset().left - this.container.offset().left + this.element.outerWidth()) - 2
        });
        this.container.find('.top').css({
          left: this.element.offset().left - this.container.offset().left - 2,
          width: this.element.outerWidth() + 4,
          height: this.element.offset().top - this.container.offset().top - 2
        });
        return this.container.find('.bottom').css({
          left: this.element.offset().left - this.container.offset().left - 2,
          width: this.element.outerWidth() + 4,
          height: this.container.height() - (this.element.offset().top - this.container.offset().top + this.element.outerHeight()) - 2
        });
      },
      componentDidMount: function() {
        this.container = $(this.refs.container.getDOMNode());
        return $(window).on('resize', this.handleWindowResize);
      },
      componentWillUnmount: function() {
        return $(window).off('resize', this.handleWindowResize);
      },
      render: function() {
        return D.div({
          ref: 'container',
          className: "focus-section" + (this.props.animate ? ' animate' : '') + " " + this.props.className
        }, D.div({
          className: 'inner-focus-section'
        }, D.div({
          className: 'top'
        }), D.div({
          className: 'right'
        }), D.div({
          className: 'left'
        }), D.div({
          className: 'bottom'
        })));
      }
    })
  };

}).call(this);

//# sourceMappingURL=common.js.map