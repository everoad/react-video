import AboutContainer from "./containers/About"
import PostContainer from "./containers/Post"
import HomeContainer from "./containers/Home"

const menu = [
  {
    text: 'Home', url: '/home', component: HomeContainer
  },
  { 
    text: 'Youtube', url: '/post', component: PostContainer
  },
  {
    text: 'About', url: '/about', component: AboutContainer
  },
  // { 
  //   text: '메뉴1', 
  //   child: [ 
  //     { text: 'first', url: '/test1' }, 
  //     { text: 'second', url: '/test2' }
  //   ] 
  // },
]

export default menu