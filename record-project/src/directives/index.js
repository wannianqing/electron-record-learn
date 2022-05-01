import MouseDragDirective from './mouseDrag'

export default {
  install(app){
    app.directive('mouse-drag',MouseDragDirective)
  }
}