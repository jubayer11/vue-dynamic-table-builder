<template>
  <div class="wrapper">
                   <span class="wrapperSpan" style="--i: 1">
                      <span class="bubble"></span>
                   </span>
    <span class="wrapperSpan" style="--i: 2">
                      <span class="wrapperSpan bubble"></span>
                   </span>
    <span class="wrapperSpan" style="--i: 3">
                    <span class="wrapperSpan bubble"></span>
                  </span>
    <span class="wrapperSpan" style="--i: 4">
                    <span class="wrapperSpan bubble"></span>
                  </span>
    <span class="wrapperSpan" style="--i: 5">
                    <span class="wrapperSpan bubble"></span>
                  </span>
    <span class="wrapperSpan" style="--i: 6">
                    <span class="wrapperSpan bubble"></span>
                  </span>
    <span class="wrapperSpan" style="--i: 7">
                    <span class="wrapperSpan bubble"></span>
                  </span>
    <span class="wrapperSpan" style="--i: 8">
                    <span class="wrapperSpan bubble"></span>
                  </span>


  </div>
</template>
<style scoped>
/**
 * ButtonAnimation.vue
 *
 * A lightweight bubble-based animation component used to indicate loading or activity.
 * Primarily used inside the "Load More" button of the table system.
 *
 * The component uses CSS animations with delay timing based on `--i` custom property.
 * Each bubble rotates and scales independently, creating a visually appealing animation.
 *
 * @component
 *
 * @usage
 * <button-animation />
 *
 * @style
 * - `.wrapper` - Holds 8 rotating `<span>` elements.
 * - `.wrapperSpan` - Each rotating layer with delay and infinite rotation.
 * - `.bubble` - A dot that expands and shifts hue during the animation.
 *
 * @animation rotate - 720° infinite rotation for `.wrapperSpan`.
 * @animation resize - Expansion and color shift for `.bubble`.
 */

.wrapper {
  position: relative;
  float: left;
}

.wrapperSpan {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  animation: rotate 5s linear infinite;
  animation-delay: calc( 0.15s * var( --i ) );
}

@keyframes rotate {
  0% { transform: rotate( 0 ) }
  100% { transform: rotate( 720deg ) }
}

.bubble {
  position: absolute;
  width: 1px;
  height: 1px;
  background-color: #2E90FA;
  border-radius: 50%;
  opacity: .6;
  animation: resize 1s linear infinite;
  animation-delay: calc( 0.15s * var( --i ) );
}

@keyframes resize {
  0% {
    filter: hue-rotate( 0deg );
  }
  90% {
    transform: scale( 8 );
    filter: hue-rotate( 360deg );
  }
}
</style>