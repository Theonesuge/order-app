<template>
	<view class="tam_details" :style="{height: device_height + 'px'}">
		<view class="tam_details_box" :style="{height: details_height + 'px'}">
			<view class="details_state">待取餐</view>
			<!-- 自取号 -->
			<view class="details_top">
				<view>自取号</view>
				<view>107</view>
				<view>自取时间：立即自取</view>
			</view>
			<!-- 食物详情 -->
			<view class="details_center">
				<view>
					<view>
						<view style="margin-bottom: 10rpx;font-weight: 600;font-size: 0.875rem;">广西南宁火炬路店</view>
						<view style="color: #999999">火炬路17号金达花园2栋5号铺面</view>
					</view>
					<u-image width="65rpx" height="65rpx" src="@/static/images/address.png"></u-image>
				</view>
				<view>
					<u-image style="margin-right: 20rpx" width="200rpx" height="128rpx" src="https://cdn.uviewui.com/uview/swiper/1.jpg"></u-image>
					<view>
						<view style="color: #333333;font-size: 0.875rem;font-weight: 600">长相忆</view>
						<view>x1</view>
					</view>
					<view style="font-size: 0.875rem"><text style="font-size: 0.75rem">¥</text>26</view>
				</view>
				<view style="font-size: 0.75rem">小计<text>¥</text><text style="font-size: 1.125rem;font-weight: 600">26</text></view>
			</view>
			<!-- 其他信息 -->
			<view class="details_bottom">
				<view class="more">其他信息</view>
				<view>
					<view>是否打包</view>
					<view>不打包</view>
				</view>
				<view>
					<view>自取时间</view>
					<view>立即自取</view>
				</view>
				<view>
					<view>下单时间</view>
					<view>2020-12-21 19:22</view>
				</view>
				<view>
					<view>订单编号</view>
					<view>xxxxxxxxxxxxxxxxxxxxxxxxxxx</view>
				</view>
				<view>
					<view>支付方式</view>
					<view>线上支付</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				device_height: '',
				details_height: ''
			}
		},
		onShow() {
			// 获取设备高度
			let _this = this;
			uni.getStorage({
				key: 'device',
				success: res => {
					_this.device_height = res.data.windowHeight;
					// 获取组件高度
					let height = uni.createSelectorQuery().select('.tam_details');
					height.boundingClientRect(data => {
						_this.details_height = data.height;
						console.log(_this.details_height);
					}).exec();
				}
			});
		}
	}
</script>

<style lang="scss" scoped>
	// 订单详情
	.tam_details {
		background-color: #f8f8f8;
		padding-bottom: 12rpx;

		.tam_details_box {
			background-color: #f8f8f8;
		}
	}

	.details_state {
		font-size: 1.25rem;
		padding: 26rpx 0 0 26rpx;
	}

	.details_top {
		margin: 26rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;

		view:nth-child(1) {
			padding: 18rpx 0 0 18rpx;
		}

		view:nth-child(2) {
			text-align: center;
			font-size: 2rem;
			color: #d81e06;
			width: 100%;
			margin: 28rpx auto;
			padding-bottom: 18rpx;
			font-weight: 600;
			border-bottom: 1rpx #ececec dashed;
		}

		view:nth-child(3) {
			text-align: center;
			font-size: 0.75rem;
			padding-bottom: 28rpx;
		}
	}

	.details_center {
		margin: 26rpx;
		padding-top: 18rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
	}

	.details_center>view:first-child {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx #ececec solid;
		width: 95%;
		margin: 10rpx auto;
		padding-bottom: 18rpx;
	}

	.details_center>view:nth-child(2) {
		width: 95%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 20rpx;
		padding-bottom: 32rpx;
		border-bottom: 1rpx #ececec solid;

		view:nth-child(2) {
			flex-grow: 2;
		}
	}

	.details_center>view:last-child {
		width: 95%;
		margin: 0 auto;
		text-align: right;
		padding-bottom: 20rpx;
		padding-top: 20rpx;
	}

	.details_bottom {
		margin: 26rpx;
		padding-top: 18rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;

		view {
			display: flex;
			justify-content: space-between;
			padding: 8rpx 18rpx;
		}

		view view:first-child {
			color: #999999;
		}
	}

	.more {
		color: #333333;
		margin-left: 20rpx;
		margin-bottom: 12rpx;
	}
</style>
