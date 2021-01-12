<template>
	<view class="notam">
		<view>
			<image src="../../static/images/icon/notam.png" style="width: 100rpx; height: 100rpx;" mode=""></image>
		</view>
		<view class="">暂无相关订单</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
/* 无相关订单 */
.notam {
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 50%;
}
.notam view:last-child{
	font-size: 0.875rem;
	color: #666666;
}
</style>
