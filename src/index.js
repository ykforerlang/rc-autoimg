import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class AutoImg extends Component {
    static propTypes = {
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        source: PropTypes.string.isRequired,
    }

    componentDidMount() {
        this.setImg(this.props.source)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.source !== this.props.source) {
            this.setImg(nextProps.source)
        }
    }

    setImg(source) {
        const { width, height } = this.props

        const ima = new Image()
        ima.src = source
        ima.crossOrigin = '' // 处理跨域图片
        ima.onload = () => {
            const ctx = this.canva.getContext('2d')
            ctx.drawImage(ima, 0, 0, width, height)

            const [r, g, b, a] = ctx.getImageData(0,0,1,1).data; // 获取背景色
            this.inner.style.background = `rgba(${r}, ${g}, ${b}, ${a})`
        }
    }

    render() {
        const { width, height } = this.props
        return (
            <div ref={inner => this.inner = inner}>
                <canvas
                    style={{
                        display: 'block',
                        margin: '0 auto'
                    }}
                    width={`${width}px`}
                    height={`${height}px`}
                    ref={canva => this.canva = canva}
                >

                </canvas>
            </div>
        )
    }
}