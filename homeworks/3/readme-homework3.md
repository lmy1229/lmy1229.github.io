#基础实验3: DOM编程

吕梦扬 <br>
2014013452 <br>
<a href="mailto:lmy1229@126.com">lmy1229@126.com</a>

----------------------------------------------

##实验目的
1. 加深对于JavaScript的了解
2. 了解DOM编程的基本方法

----------------------------------------------

##实验内容
1. DOM基础
	- 实现简易DOM选择器
	- 实现DOM属性访问器
2. DOM综合
	- 实现**返回顶部按钮**, 要求
		- 点击可以返回顶部, 有动画
		- 通过键盘按键返回顶部
		- 滚动条在最顶部时,不显示按钮
		- 支持按钮在任意位置和四个边角
	- 实现**自定义alert弹层组件**, 要求
		- 可以设置任意内容
		- 弹层可以通过参数来控制是否可拖拽
		- 通过参数使用键盘控制关闭弹层
3. DOM分析
	- 分析[这个网页](http://mami.baidu.com/main?channel=org)顶部的图片轮播的实现

----------------------------------------------

##DOM基础
####简易DOM选择器的实现
- 在较新的浏览器上,DOM选择器的实现比较简单,只需要调用`document.getElementById`,`document.getElementsByTagName`和`document.getElementsByClassName`即可.但是对于IE 8,不支持`document.getElementsByTagName`和`document.getElementsByClassName`函数,因此采用Polyfill的方法为旧的浏览器实现这两个函数.
- Polyfill采用自启动函数的方法,在页面加载js的时候,首先判断浏览器是否实现了`document.getElementsByTagName`和`document.getElementsByClassName`函数,如果没有,那么就使用`document.querySelectorAll`来实现这两个函数.

####DOM属性访问器的实现
- 在DOM选择器返回结果之前,遍历选择的所有结果,为每一个结果添加`.attr`
- 属性访问器`attr`使用JavaScript内置的`getAttribute`和`setAttribute`实现. 首先判断参数类型, 决定是访问属性还是设置属性.然后分别调用`getAttribute`和`setAttribute`来实现功能. 在设置属性时,`attr`函数将`this`返回,于是就可以类似*jQuery*一样,使用链式调用,如`$("...").attr('a1','v1').attr('a2','v2')...`

####源代码在[DOM_Selector.js](DOM_Selector.js)
##DOM综合
###返回顶部按钮
- **返回顶部功能**
按下按钮后,调用了`goToTop`函数.该函数每隔10ms计算当前显示的窗口和整个页面的最顶部的距离,然后将窗口向上移动这个距离的0.9倍.如果距离小于1px,则停止计时器.于是,返回顶部就有了逐渐减速的效果.通过捕获`document.onkeypress`时间来
- **顶部不显示按钮**
在`window.onscroll`时间中判断当前显示的窗口和整个页面的最顶部的距离,如果等于0,则将按钮设为`display: none`.否则将`display`设空.

- **展示页面**
请见`backToTop_demo.html`(请创建本地服务器),或访问[我的github主页](lmy1229.github.io)

- **源代码**在[backToTop.js](backToTop.js)

###自定义弹窗效果
- 本实验完成的弹窗分为2个部分. 弹窗的本体和作为半透明的背景. 实现的函数有3个,即`popAlert.init()`,`popAlert.show()`和`popAlert.close()`.
- `popAlert.init()`函数接受一个object参数`param`,其中规定了用户想要的效果. 目前支持包括
	- param.title: 弹窗的标题, string, 可以是HTML格式
	- param.content: 弹窗的内容, string, 可以使HTML格式
	- param.draggable: 是否允许拖动, bool, 默认是true
	- param.closeKey: 键盘关闭的快捷键, number, 使用JavaScript的keyCode
	
	在`popAlert.init()`首先判断在`popAlert`中是否已经创建过一个背景`popAlert.shadow`,如果没有创建一个. 然后新创建一个`popAlert.box`作为弹窗(由于每次提供的参数可能不同,因此要重新创建), 将传进的param保存进入`popAlert.param`.记录当前的弹窗左上角的位置	.

- `popAlert.show()`将创建好的弹窗和背景阴影显示出来,然后为弹窗的标题div(因为我设计必须拖动弹窗的标题才有效)设置事件监视. 首先设置标题的`onmousedown`事件, 在设置这个事件的内部设置`document.onmousemove`和`document.onmouseup`. 设置document而不是标题div的事件是为了防止鼠标拖动过快出了弹窗的标题范围,导致事件捕获失败. 然后记录原本的`document.onkeydown`事件,并将其附一个新的处理函数. 这个函数在closekey对应的键按下后调用`popAlert.close()`.
- `popAlert.close()`首先将`popAlert.shadow`和`popAlert.box`从body中删除,然后将原本的`document.onkeydown`换回去.
- 展示界面请见[这里](https://lmy1229.github.io/homeworks/3/)
- 源代码在[PopAlert.js](PopAlert.js)

##图片轮播效果分析
####图片播放的效果

- 首先写一个通用的动画类, 实现了将任意物体移动的方法.例如`Animate.move(obj, from, to, duration)`.该函数可以通过使用JavaScript的`setInterval`或`setTimeout`函数将物体一步一步移动过去. 
	- 或者使用CSS3的动画效果, 此方法可以极大地节省计算资源,因为不用通过计时器不断更新界面.但是CSS3的动画适合比较简单的动画,而之后图片还需要相应点击事件以及轮流播放效果,因此此处不宜使用CSS3的动画
- 有了通用的动画函数之后就可以做图片播放的效果. 只需要设置`setInterval`,每隔一段时间将图片通过动画移动一段距离即可

####图片响应手指滑动的事件

- 由于原网页是一个移动端的网页,因此交互应当使用手指,使用触屏的API.但是此处还是考虑使用`mousedown`,`mousemove`,`mouseup`事件.
- 与本次作业中可拖动的自定义弹窗类似, 在鼠标点下(mousedown)时, 记录点中的图片的初始位置,然后通过全局的`document.onmousemove`事件来追踪鼠标的位移,将位移加入所有图片中(比如5张),于是所有图片均会有一个位移. 

####图片轮流出现的效果

- 为了保证图片能够向一个方向一直翻页, 图片到头能够重新播放最开始的图片的效果, 需要时刻保证当前显示的图片左右各有一半的图片.假设总共有n个图片,当前显示的是第k张图片, 那么第m个图片所在位置为 ((m-k+n/2)%n - n/2), 其中0表示当前正在显示的图片的位置, k表示该图片在中心右边第k个图片的位置,-k表示该图片在左边第k个图片的位置.对于自动播放和手指移动的结果,每次通过前正中间的图片来决定所有图片所在的位置. 于是就可以实现轮流播放了.

##Bonus
- 将本次实现的backToTop控件加入到了个人主页的所有页面中.
- 