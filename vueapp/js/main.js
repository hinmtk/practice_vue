//即時関数
$(function(){
  'use strict';

  // var filtered = [12,5,8,130,44].filter(function(element, index, array){
  //   return (element >= 10);
  // });
  // console.log(filtered);

  //UIに結びつくモデル = vueモデル


  //Components
  var likeComponent = Vue.extend({
    // props:['message'],
    //propertyにデフォルト値や型を指定することもできる
    props:{
      message:{
        type:String,
        default:'Like'
      }
    },
    //componentのdataは関数で返してあげなくてはいけない
    data: function(){
      return{
        count:0
      }
    },
    template: '<button @click="countUp">{{ message }} {{ count }}</button>',
    methods:{
      countUp: function(){
        this.count++;
        this.$emit('increment');
      }
    }
  });

  var app3 = new Vue({
    el:'#app3',
    components:{
      'like-component':likeComponent
    },
    data:{
      total:0
    },
    methods:{
      incrementTotal: function(){
        this.total++;
      }
    }
  })


  var app1 = new Vue({
    el: '#app',
    data:{
      name:'world'
    }
  });

  var app2 = new Vue({
    el: '#app2',
    data:{
      newItem:'',
      todos:[]
    },
    watch:{
      todos: {
        handler: function(){
          localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        deep:true
      }
    },
    mounted: function(){
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods:{
      addItem: function(){
        var item = {
          title: this.newItem,
          isDone: false
        };
        //data内のdataにはthisでアクセスできる
        this.todos.push(item);
        this.newItem = '';
      },
      deleteItem: function(index){
        if(confirm('are you sure?')){
          this.todos.splice(index,1);
        }
      },
      purge: function(index){
        if(!confirm('delete finished?')){
          return;
        }
        // this.todos = this.todos.filter(function(todo){
        //   return !todo.isDone;
        // });
        this.todos = this.remaining;
      }
    },
    computed:{
      remaining: function(){
        return this.todos.filter(function(todo){
          return !todo.isDone;
        });
      }
    }
  });

  var app5 = new Vue({
    el:'#app5',
    data:{
      message:'Hello',
      image:'./test.jpg',
      items:[
        {name:'aaaaa'},
        {name:'bbbb'},
        {name:'cccc'}
      ],
      show:true,
      scroll:0,
      isActive:false,
      styleType:{
        color:'red',
        backgroundColor:'#eee'
      },
      type:'A',
      newMonsterName:'',
      monsters:[
        // { name:'スライム', hp:100 },
        // { name:'ドラゴン', hp:200 },
        // { name:'キマイラ', hp:300 }
      ],
      sampleHtml:'<span>あいうえおかきくけこさし</span>'
    },
    methods:{
      onClick(){

        this.newMonster = { name:this.newMonsterName, hp:500 };
        this.monsters.push(this.newMonster);
      },
      onDelete(){
        this.monsters.splice(this.monsters.length-1,1);
      },
      onAzarashiClick(){
        alert('あざらし');
      },
      onRightClick($event, message){
        console.log('test');
        console.log($event);
      }
    },
    //DOMに触れるのはmounted以降
    mounted(){
      this.scroll=100;
      const monster = { name:'はいの', hp:400 };
      this.monsters.push(monster);
      const $azarashi = $(this.$refs.azarashi);
      this.message = 'メッセージ変えたよ';
    },
    created(){

      axios.get('./json/monsters.json').then(function(res){
        this.monsters = res.data;
      }.bind(this)).catch(function(e){
      });
    }

  });


});