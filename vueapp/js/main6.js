var headerTemplate=`
  <div style="color:#333;">
    <slot name="header">※親から何も渡って来ない場合、この文が表示されます</slot>
  </div>
`;

var contentTemplate=`
  <div class="content">
    <slot name="content">No contents</slot>
  </div>
`;

var auto = {
  login:function(id,pass){
    window.alert('userid:' + id + '\n' + 'password:' + pass);
  }
}


Vue.component('page-header',{
  template:headerTemplate
})

Vue.component('page-content',{
  template:contentTemplate
})

Vue.component('user-login',{
  template:'#login-template',
  data:function(){
    return {
      userid:'',
      password:''
    }
  },
  created:function(){
  },
  methods:{
    login:function(){
      console.log('login');
      //auth.login(this.userid, this.password);
    }
  }
})

new Vue({
  el:'#vm'
})

new Vue({
  el:'#login-example'
})