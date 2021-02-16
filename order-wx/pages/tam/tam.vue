<template>
	<view class="tam" :style="{ height: device_height + 'px' }">
		<view class="tam-card">
			<TamCard :card="card" v-for="card in cards" :key="card.id" />
		</view>
		<u-divider v-if="cards" color="#333333" bg-color="#f8f8f8" half-width="100" border-color="#6d6d6d">仅展示半年的订单</u-divider>
		<view v-if="cards === ''" class="notam">
			<image src="@/static/images/notam.png" style="width: 100rpx;height: 100rpx;" mode=""></image>
			<view>暂无订单</view>
		</view>
	</view>
</template>

<script>
import TamCard from '@/components/tamcard/index.vue';
export default {
	components: {
		TamCard
	},
	data() {
		return {
			device_height: '',
			cards: [
				{
					id: 1,
					url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					address: '广西南宁火炬路店',
					time: '2020-12-21 19:22',
					state: '等待取餐',
					title: '长相忆',
					price: 20.24,
					count: 1
				},
				{
					id: 2,
					url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					address: '广西南宁火炬路店',
					time: '2020-12-21 19:22',
					state: '等待取餐',
					title: '长相忆',
					price: 20.24,
					count: 2
				},
				{
					id: 3,
					url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					address: '广西南宁火炬路店',
					time: '2020-12-21 19:22',
					state: '等待取餐',
					title: '长相忆',
					price: 20.24,
					count: 3
				}
			]
		};
	},
	onShow() {
		// 获取设备高度
		uni.getStorage({
			key: 'device',
			success: res => {
				this.device_height = res.data.windowHeight;
			}
		});
	},
};
</script>

<style scoped lang="scss">
// 订单
.tam {
	background-color: #f8f8f8;
	.tam-card {
		padding-top: 36rpx;
		padding-bottom: 1rpx;
		background-color: #f8f8f8;
	}
}
.notam {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 50%;
	view {
		margin-top: 8rpx;
		font-size: 0.75rem;
	}
}
</style>
