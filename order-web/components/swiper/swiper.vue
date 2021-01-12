<template>
	<!-- 轮播图 -->
	<view>
		<swiper class="swiper" :indicator-dots="indicatorDots" :indicator-active-color="indicator_active_color" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item, index) in img_src" :key="index">
				<view class="swiper-item uni-bg-red"><image style="width: 100%;height: 400rpx;" mode="scaleToFill" :src="item.src"></image></view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	name: 'Swiper',
	data() {
		return {
			// 指示点
			indicatorDots: true,
			// 指示点颜色
			indicator_active_color: '#FFFFFF',
			// 自动播放
			autoplay: true,
			// 自动播放间隔时长(ms)
			interval: 3000,
			// 幻灯片切换时长(ms)
			duration: 800,
			// 轮播图片
			img_src: [
				{
					src: '../../static/images/banner.jpg'
				},
				{
					src: '../../static/images/banner.jpg'
				},
			]
		};
	}
};
</script>

<style scoped>
.swiper {
	height: 400rpx;
}
</style>
