# 根据 轮播图背景色 自动填充剩余背景色的 走马灯

## 起因
今天产品经理过来说，需要在首页加上一个类似一个[天猫](https://www.tmall.com)的轮播图。
天猫的轮播图是 图片定宽定高， 当不同分辨率屏幕时候 会根据图片的背景色填充容器左右空隙。 比如
1800px屏:
![1800px.jpg-136.2kB][1]

3000px屏:
![3000px.jpg-147.1kB][2]

第一反应：不管是js还是css 都没有办法获取图片色值的， 那必须服务端给我了。要么 后台cms在上次图片的时候，指定好背景色， 要么服务端调用图片api获取背景色然后给我。
天猫应该是这么做的。

## AutoImg
纯前端的话， 有么有办法获取色值呢？ 突然想到，之前做WebGL贴纹理的时候， 在片元着色器里是可以获取到图片每一个像素点的色值的。 用WebGL肯定是太大了， canvas可以吗？ 查询了一下是可以的，有方法的getImageData。 那么至少说明了纯前端的做饭是可行的。 我们先实现一个组件AutoImg，AutoImg中的img 定高定宽， 容器的背景色用img的背景色填充。 
```javascript
export default class AutoImg extends Component {
    static propTypes = {
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        source: PropTypes.number.isRequired,
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
```
这里 考虑到getImageData 参数是整形， 所有要求width， height必须是number类型，1000代表1000px

## 轮播
轮播我们就不造轮子了，直接使用[nuka-carousel](https://github.com/FormidableLabs/nuka-carousel)。 
```javascript
import Carousel from 'nuka-carousel'

default class Banner extends Component {
    render() {
       const bannerImgList = [
        'https://img.alicdn.com/tps/i4/TB1yqAhcpmWBuNjSspdSuvugXXa.jpg',
        'https://img.alicdn.com/tps/i4/TB1XVCsaTdYBeNkSmLySutfnVXa.jpg',
        'https://img.alicdn.com/simba/img/TB1ror0cf5TBuNjSspcSuvnGFXa.jpg',
        'https://img.alicdn.com/tfs/TB1ed2lggmTBuNjy1XbXXaMrVXa-1130-500.jpg_q100.jpg_.webp',
    ]
       
       
        return (
            <div className={styles.banner}>
                <Carousel
                    autoplay={true}
                >
                    {
                        bannerImgList.map(source => (
                            <div key={source}>
                                <AutoImg
                                    width={1200}
                                    height={340}
                                    source={source}
                                />
                            </div>
                        ))
                    }
                </Carousel>
            </div>
        )
    }
}
```

2500px 效果：
![my2500.gif-1714kB][3]

## 结语
或许你也有这种轮播需求，如果没有希望提取颜色的地方，可以启发到你。 

---

  [1]: http://static.zybuluo.com/ykforerlang/9af8jl7jo6szhcil7ibp8vr8/1800px.jpg
  [2]: http://static.zybuluo.com/ykforerlang/rez9a1uqzz0tiuxk9c0x4mhr/3000px.jpg
  [3]: http://static.zybuluo.com/ykforerlang/cv252dfnl5kb53lx257oh575/my2500.gif