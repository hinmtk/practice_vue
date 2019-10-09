$(function(){
  'use strict';

  var compA = {
    template:'<div class="comp-a">Aだよ</div>'
  }

  var compB = {
    template:'<div class="comp-b">Bだよ</div>'
  }

  //関数型コンポーネント
  var compC = {
    // functional:true,
    // render:function(createElement, context){
    //   return createElement('div',context.props.message)
    // },
    template:'<div>{{ message }} <button @click="childEvent">child button</button>\
              <input type="text" v-model="localName"></div>',
    props:{
      level:{
        type:Number
      },
      val:String,
      test:String,
      message:String,
      name:String
    },
    created:function(){
      this.$on('open',this.open);
    },
    methods:{
      open:function(){
        console.log('open');
      },
      childEvent:function(){
        this.$emit('child-event');
      }
    },
    computed:{
      changeTxt:function(){
        return this.message + 'ぽよぽよ';
      },
      localName:{
        get:function(){
          return this.name;
        },
        set:function(val){
          this.$emit('update:name',val);
          console.log(this.name);
        }
      }
    }
  }

  var vm1 = new Vue({
    el:'#vm1',
    data:{
      componentTypes:[compA,compB],
      current:0,
      lebel:this.lebel,
      canBuy:true,
      message:'メッセージ',
      name:'小林さん'
    },
    components:{
      compA,
      compB,
      'comp-c':compC
    },
    computed:{
      component:function(){
        return this.componentTypes[this.current]
      }
    },
    methods:{
      onClick:function(){
        this.$refs.child.$emit('open');
      },
      parentEvent:function(){
        console.log('parentEvent');
        this.message='ぽよぽよ';
      }
    },
    created:function(){
    }
  });

});