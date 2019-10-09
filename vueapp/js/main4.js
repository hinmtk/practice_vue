$(function(){
  'use strict';

  var myInput = {
    template:`\
            <div><input v-on:input="$emit('input', $event.target.value)"\
             placeholder="test" /><p>value :{{ value }}</p></div>`,
    props:{
      value:String //親から渡ってくる値(v-modelの値)をvalueとして取得する
    }
  }

  var myCheckbox = {
    template:`<div><input id="checkbox" type="checkbox" v-bind:checked="checked"\
              v-on:change="$emit('change',$event.target.checked)"\
               /><label for="checkbox">{{ checked }}</label></div>`,
    model:{
      prop:'checked', //渡ってくるvalue(v-modeの値)をcheckedの値に変更する
      event:'change' //イベントをchangeに割り当てる
    },
    props:{
      checked:Boolean //親から渡ってくる値(v-modelの値)をcheckedに変更して取得する
    }
  }

  var myComponent = {
    template:'<div class="my-component">\
            <p>名前.{{ name }} HP.{{ hp }}</p>\
            <p>名前 <input v-model="localName" /></p>\
            <p>HP <input size="5" v-model.number="localHp" /></p>\
            </div>',
    props:{
      name:String,
      hp:Number
    },
    computed:{
      localName:{
        get:function(){ return this.name },
        set:function(val){ this.$emit('update:name', val) }
      },
      localHp:{
        get:function(){ return this.hp },
        set:function(val){ this.$emit('update:hp', val) }
      }
    },
    created:function(){
      console.log(this.name);
    }
  }

  var vm1 = new Vue({
    el:'#vm1',
    data:{
      text:'text'
    },
    components:{
      'my-input':myInput
    },
    created:function(){
    }
  });

  var vm2 = new Vue({
    el:'#vm2',
    data:{
      checked:''
    },
    components:{
      'my-checkbox':myCheckbox
    }
  });

  var vm3 = new Vue({
    el:'#vm3',
    components:{
      'my-component':myComponent
    },
    data:{
      name:'スライム',
      hp:100
    }
  });

});