<template>
	<view @click="getTamDetails" class="tam-list">
		<view class="tamlist-top">
			<view>
				<view>{{card.address}}</view>
				<view style="margin-top: 10rpx;">{{card.time}}</view>
			</view>
			<view>{{card.state}}</view>
		</view>
		<view class="tamlist-bottom">
			<view class="tam-img">
				<u-image width="200rpx" height="120rpx" border-radius="5px" :src="card.url"></u-image>
			</view>
			<view class="tam-title">{{card.title}}</view>
			<view class="tam-price">
				<view>¥{{card.price}}</view>
				<view>共<text style="color: #d81e06">{{card.count}}</text>件</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 待取餐的数据
			card: {
				type: Object,
				default: []
			}
		},
		methods: {
			getTamDetails() {
				uni.navigateTo({
					url: '/pages/tamDetails/tamDetails'
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	// 订单列表
	.tam-list {
		margin: 0 36rpx 36rpx;
		border-radius: 10rpx;
		background-color: #ffffff;
		padding: 28rpx;
	}

	.tamlist-top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 18rpx;

		view:last-child {
			font-size: 0.75rem;
			color: #ffaa00;
		}

		view:first-child view:first-child {
			font-size: 0.875rem;
			color: #333333;
		}

		view:first-child view:last-child {
			color: #999999;
		}
	}

	.tamlist-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;

		view:nth-child(2) {
			flex-grow: 2;
		}
	}

	.tam-title {
		font-size: 0.75rem;
		padding-left: 20rpx;
	}

	.tam-price {
		text-align: right;

		view:first-child {
			font-size: 0.875rem;
			margin-bottom: 8rpx;
		}

		view:last-child {
			color: #999999;
			font-size: 0.75rem;
			letter-spacing: 1px;
		}
	}
</style>
