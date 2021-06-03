<template>
  <scroll class="content">
    <ul>
      <!--1.无论是否设置click:true，button都可以点击-->
      <button @click="btnClick">按钮</button>
      <!--2.必须设置click:true，那么div才能监听点击-->
      <div @click="divClick">呵呵呵呵</div>

      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
      <li>列表11</li>
      <li>列表12</li>
      <li>列表13</li>
      <li>列表14</li>
      <li>列表15</li>
      <li>列表16</li>
      <li>列表17</li>
      <li>列表18</li>
      <li>列表19</li>
      <li>列表20</li>
      <li>列表21</li>
      <li>列表22</li>
      <li>列表23</li>
      <li>列表24</li>
      <li>列表25</li>
      <li>列表26</li>
      <li>列表27</li>
      <li>列表28</li>
      <li>列表29</li>
      <li>列表30</li>
      <li>列表31</li>
      <li>列表32</li>
      <li>列表33</li>
      <li>列表34</li>
      <li>列表35</li>
      <li>列表36</li>
      <li>列表37</li>
      <li>列表38</li>
      <li>列表39</li>
      <li>列表40</li>
      <li>列表41</li>
      <li>列表42</li>
      <li>列表43</li>
      <li>列表44</li>
      <li>列表45</li>
      <li>列表46</li>
      <li>列表47</li>
      <li>列表48</li>
      <li>列表49</li>
      <li>列表50</li>
    </ul>
  </scroll>
</template>

<script>
// import BScroll from 'better-scroll';
import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "Category",
  components: {
    Scroll
  },
  // data() {
  //   return {
  //     scroll: null
  //   }
  // },
  created() {
    // console.log(this.$refs.aaa);
    // console.log(document.querySelector('.wrapper'));
    // this.scroll = new BScroll(null/undefine, {
    //
    // });
  },
  mounted() {
    console.log(this.$refs.aaa);
    console.log(document.querySelector('.wrapper'));
    // this.scroll = new BScroll(document.querySelector('.wrapper'), {
    //   probeType: 3,
    //   pullUpLoad: true,
    //   click: true
    // });
    // this.scroll.on('scroll', (position) => {
    //   console.log(position);
    // });
    // this.scroll.on('pullingUp', () => {
    //   console.log('上拉加载更多');
    // })
  },
  methods: {
    btnClick() {
      console.log('btnClick');
    },
    divClick() {
      console.log('divClick');
    }
  }
}
</script>

<style scoped>

.content {
  height: 200px;
  background-color: yellow;
  overflow: hidden;
  /*overflow-y: scroll;*/
}

</style>
