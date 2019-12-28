<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const {title } = context.props
    const  icon = 'leftIconDiv '+context.props.icon
    const vnodes = []
    if (icon) {
      vnodes.push(<i class={icon}></i>)
    }
    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    vnodes.push(<i class="rightIconDiv fa fa-angle-right"></i>)
    return vnodes
  }
}
</script>
<style scoped>
  .leftIconDiv{
    margin-right:10px;
    color:#444;
    display:inline-block;
    width: 14px;

  }
  .rightIconDiv{
    color:#444;
    float:right;
    margin-top:16px;
  }
</style>
