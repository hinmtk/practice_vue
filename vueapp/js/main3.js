$(function(){
  'use strict';

  //イベントバス
  var bus = new Vue({
    data:{
      count:0
    }
  });

  var compA = {
    template:'<div><p>コンポーネントA</p><button v-on:click="onClick">click</button></div>',
    data:function(){
      return{
        message:'compA'
      }
    },
    methods:{
      onClick:function(){
        bus.$emit('event-bus');
      }
    }
  }

  var compB = {
    template:`<div>
                コンポーネントB bus: {{ bus.count }}<br>
                <input type="text" @keyup.enter="test" value="emitテスト">
              </div>`,
    props:{'message':String,isSwitchOff:Boolean},
    computed:{
      //busのデータを算出プロパティに使用
      bus:function(){
        return bus.$data
      }
    },
    created:function(){
      bus.$on('event-bus', this.countUp);
    },
    methods:{
      countUp:function(){
        bus.count++;
      },
      test:function(){
        this.$emit('enter');
      }
    }
  }

  var compChild = {
    template:'<li>{{ name }} HP.<span v-bind:style="styleType">{{ hp }}</span>\
              <button v-on:click="doAttack">攻撃する</button></li>',
    props:{'id':Number, 'name':String, 'hp':Number},
    data:function(){
      return{
        message:'あええええええ',
        styleType:{
          color:'red'
        },
        atackedNum:this.hp
      }
    },
    methods:{
      doAttack:function(){
        // this.atackedNum = this.atacked;
        // console.log(this.atackedNum);

        this.$emit('attack',this.id);
      }
    },
    computed:{
      atacked:function(){
        return this.atackedNum - 10;
      }
    }
  }

  var vm1 = new Vue({
    el:'#vm1',
    data:{
      isSwitchOff:true,
      message:'親コンポーネントのメッセージです',
      list:[
        { id:1, name:'スライム', hp:100 },
        { id:2, name:'ゴブリン', hp:200 },
        { id:3, name:'ドラゴン', hp:300 }
      ],
      count:0
    },
    components:{
      'comp-child':compChild,
      'comp-a':compA,
      'comp-b':compB
    },
    methods:{
      handleAttack:function(id){
        //引数のIDから要素を検索
        var item = this.list.find(function(el){
          return el.id === id
        });
        if(item !== undefined && item.hp > 0) item.hp -= 10;

      },
      test:function(){
        console.log('親のtest');
      }
    },
    mounted:function(){
      console.log('1');
    }
  })

  var data = {'message':'dataです'}

  var vm2 = new Vue({
    el:'#vm2',
    data:data,
    mounted:function(){
      console.log('2');
      //インスタンスプロパティの書き方で他のインスタンスのプロパティにアクセスできる
      console.log(vm1.$data.message);
    }
  });

  //コンポーネントの書き方1(スコープを切ってインスタンスでだけ使えるようにする)
  var componentA = {
    template:'<p v-on:click="onClick">componentA</p>',
    methods:{
      onClick:function(){
        this.$emit('change');
      },
      created:function(){
        this.$on('open',function(){
          console.log('open');
        });
      }
    }
  }

  var componentC = {
    template:'<div><h3>componentC</h3>\
              </div>',
    methods:{
      onClick:function(){
        console.log('onClickComponentC');
      }
    },
    created:function(){
      this.$on('open',function(){
        console.log('open');
      });
    }
  }

  var app1 = new Vue({
    el:'#app1',
    components:{
      'component-a':componentA,
      'component-c':componentC,
    },
    data:{
    },
    methods:{
      changeClass:function(){
        console.log('changeClass');
      },
      onClick:function(){
        //this.$refs.child.onClick();
        this.$refs.child.$emit('open');
      }
    }
  });

  //グローバルにコンポーネントを使いたい場合
  Vue.component('component-b',{
    template:'<p>componentB</p>'
  });

  var app2 = new Vue({
    el:'#app2'
  });

  var componentD = {
    template:'<section class="comp-child">\
              <header><slot name="header" text="子から親へテキスト渡すよ">タイトルとリードが入ります</slot></header>\
              <main class="content"><slot>デフォルトコンテンツ</slot></main>\
              <slot name="footer"><!-- なければ何も表示しない --></slot>\
              </section>'
  }

  var navigationLink = {
    template:'<a v-bind:href="url" class="nav-link"><slot></slot></a>'
  }

  var vm3 = new Vue({
    el:'#vm3',
    components:{
      //'navigation-link':navigationLink,
      'component-d':componentD
    }
  });

  var vm4 = new Vue({
    el:'#vm4',
    data:{
      message:'',
      checked:false,
      checkedNames:[],
      picked:'',
      toggle:'',
      selected:''
    },
    methods:{
    },
    components:{

    }
  });

});