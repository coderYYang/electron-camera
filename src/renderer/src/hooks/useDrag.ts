/*
 * @Author: yy 691335336@qq.com
 * @Date: 2023-06-24 19:48:10
 * @LastEditors: yy 691335336@qq.com
 * @LastEditTime: 2023-06-24 20:34:02
 * @FilePath: /camera/src/renderer/src/hooks/useDrag.ts
 * @Description:
 */
class Drag {
  // 鼠标点击的x坐标
  private pageX: number = 0
  // 鼠标点击的y坐标
  private pageY: number = 0
  private body?: HTMLBodyElement
  constructor() {}

  /**
   * @description: 运行
   * @return {*}
   */
  public run(): void {
    window.addEventListener('DOMContentLoaded', () => {
      this.body = document.querySelector('body')!
      this.body.addEventListener('mousedown', this.handleMousedown.bind(this))
    })
  }

  /**
   * @description: 鼠标按下
   * @param {MouseEvent} event
   * @return {*}
   */
  private handleMousedown(event: MouseEvent): void {
    const { pageX, pageY } = event
    this.pageX = pageX
    this.pageY = pageY

    const handleMousemoveCallback = this.handleMousemove.bind(this)
    this.body?.addEventListener('mousemove', handleMousemoveCallback)
    this.body?.addEventListener('mouseup', () => {
      this.body?.removeEventListener('mousemove', handleMousemoveCallback)
    })
    this.body?.addEventListener('mouseout', () => {
      this.body?.removeEventListener('mousemove', handleMousemoveCallback)
    })
  }

  /**
   * @description: 鼠标移动
   * @return {*}
   */
  private handleMousemove(event: MouseEvent): void {
    const { pageX, pageY } = event

    const x = pageX - this.pageX
    const y = pageY - this.pageY
    window.api.drag({ x, y })
  }
}

export default () => {
  const drag = new Drag()
  return { drag }
}
