# screen card

------

一款在屏幕上截图做卡片的插件

# 代码结构
- 事件分发
- 服务订阅
- 组件化

# 一些要素
## 事件的编写规则
1 事件是瞬态的, 表示发生的那一刻的状态, 需要用瞬态完成动作词语 比如 moved, started ,begin, end, stopped

## 状态的编写规则
1 状态是持续的, 表示持续一段时间的状态, 所以需要用持续动作词语, 比如 moving, 