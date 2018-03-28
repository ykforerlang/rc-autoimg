'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoImg = function (_Component) {
    _inherits(AutoImg, _Component);

    function AutoImg() {
        _classCallCheck(this, AutoImg);

        return _possibleConstructorReturn(this, (AutoImg.__proto__ || Object.getPrototypeOf(AutoImg)).apply(this, arguments));
    }

    _createClass(AutoImg, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setImg(this.props.source);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.source !== this.props.source) {
                this.setImg(nextProps.source);
            }
        }
    }, {
        key: 'setImg',
        value: function setImg(source) {
            var _this2 = this;

            var _props = this.props,
                width = _props.width,
                height = _props.height;


            var ima = new Image();
            ima.src = source;
            ima.crossOrigin = ''; // 处理跨域图片
            ima.onload = function () {
                var ctx = _this2.canva.getContext('2d');
                ctx.drawImage(ima, 0, 0, width, height);

                var _ctx$getImageData$dat = _slicedToArray(ctx.getImageData(0, 0, 1, 1).data, 4),
                    r = _ctx$getImageData$dat[0],
                    g = _ctx$getImageData$dat[1],
                    b = _ctx$getImageData$dat[2],
                    a = _ctx$getImageData$dat[3]; // 获取背景色


                _this2.inner.style.background = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props2 = this.props,
                width = _props2.width,
                height = _props2.height;

            return _react2.default.createElement(
                'div',
                { ref: function ref(inner) {
                        return _this3.inner = inner;
                    } },
                _react2.default.createElement('canvas', {
                    style: {
                        display: 'block',
                        margin: '0 auto'
                    },
                    width: width + 'px',
                    height: height + 'px',
                    ref: function ref(canva) {
                        return _this3.canva = canva;
                    }
                })
            );
        }
    }]);

    return AutoImg;
}(_react.Component);

AutoImg.propTypes = {
    height: _propTypes2.default.number.isRequired,
    width: _propTypes2.default.number.isRequired,
    source: _propTypes2.default.string.isRequired
};
exports.default = AutoImg;