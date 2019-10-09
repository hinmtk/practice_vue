$(function(){
  'use strict';

  Vue.directive('hogehoge', {
    // ひも付いている要素が DOM に挿入される時...
    inserted: function (el) {
      console.log(el);
    }
  });

  //グローバルコンポーネント
  Vue.component('test2-component',{
    template:'<button>あばばばばば</button>'
  });
  //ローカルコンポーネント
  var testConponent = {
    template:'<p v-on:click="onClick">コンポーネント</p>',
    data:function(){
      return{
        message:'Hello world'
      }
    },
    methods:{
      onClick:function(){
        alert('コンポーネントだよ');
      }
    }
  }

  //Components
  // var testComponent = Vue.extend({
  //   template: '<button>test</button>',
  // });

  var app1 = new Vue({
    el:'#app1',
    data:{
      //フォームの入力と非も付けるデータ
      budget:300,
      limit:2,
      list:[
        { id:1, name:'りんご', price:100 },
        { id:2, name:'ばなな', price:200 },
        { id:3, name:'いちご', price:300 },
        { id:4, name:'おれんじ', price:400 },
        { id:5, name:'めろん', price:500 },
      ],
      scrollY:0
    },
    computed:{
      //budget以下のリストを返す算出プロパティ
      matched:function(){
        return this.list.filter(function(el){
          return el.price <= this.budget
        },this);
      },
      //matchedで返ったデータをlimit件返す算出プロパティ
      limited:function(){
        return this.matched.slice(0,this.limit)
      }
    },
    watch:{
      // value:_.debounce(function(newVal){
      //   console.log('debounce');
      // },
      // 500)
    },
    created:function(){
      this.budget = 1000;
      // this.$watch('value', function(){

      // },{
      //   immediate:true
      // });
    }
  });

  var app2 = new Vue({
    el:'#app2',
    components:{
      'test-component':testConponent
    },
    data:{
      list:[],
      items:[],
      current:'',
      topics:[
        { value :'vue', name:'Vue.js' },
        { value :'jQuery', name:'jQuery' }
      ],
      price:19800,
      message:'ほげほげ',
      video1:false,
      video2:false
    },
    watch:{
      current:function(val){
        console.log(val);
        //GitHubのAPIからトピックのリポジトリを検索
        axios.get('https://api.github.com/search/repositories',{
          params:{ q:'topic' + val }
        }).then(function(res){
          this.list = res.data.items
        }.bind(this));
      },
      items:function(){
        //更新後のul要素の高さを取得できない…
        console.log('通常', this.$refs.items.offsetHeight);
        //nextTickを使えばできる
        this.$nextTick(function(){
          console.log('nextTick', this.$refs.items.offsetHeight);
        });
      }
    },
    filters:{
      localNum:function(val){
        return val.toLocaleString()
      },
      filter:function(message, foo, num){
        return message + ',' + foo + ',' + num;
      },
      round:function(val){
        return Math.round(val * 100) / 100;
      },
      radian:function(val){
        return val * Math.PI / 180;
      }
    },
    directives:{
      focus:{
        //紐付いている要素がDOMに挿入されるとき
        inserted:function(el){
          el.focus();
        }
      },
      video(el, binding){
        binding.value ? el.play() : el.pause()
      }
    },
    created:function(){
      this.$nextTick(function(){
        console.log('DOM更新後');
      })
    }
  });

});