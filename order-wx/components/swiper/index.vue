<template>
	<!-- 轮播图 -->
	<view class="wrap">
		<u-swiper border-radius="0" :height="swiper_height" :list="list" :duration="duration"></u-swiper>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 轮播图高度
			swiper_height:"400",
			// 轮播图切换时间
			duration:1000,
			list: [
				{
					image: 'https://cdn.uviewui.com/uview/swiper/1.jpg'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/1.jpg'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/1.jpg'
				}
			]
		};
	},
};
</script>

<style lang="scss" scoped>
.wrap {
	padding: 0 !important;
}
</style>
