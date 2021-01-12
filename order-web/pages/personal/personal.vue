<template>
	<view class="personal">
		<!-- 个人信息 -->
		<view class="personal-userinfo">
			<view class="personal-info">
				<view class="personal-head">
					<image :src="userInfo.avatarUrl" style="width: 120rpx; height: 120rpx;" mode=""></image>
					<view class="personal-name">
						<view>{{ userInfo.nickName }}</view>
						<view class="level"><text>LV0</text></view>
					</view>
				</view>
				<view class="personal-vip">
					<view class="order-icon iconfont order-iconico"></view>
					<view>会员码</view>
				</view>
			</view>
			<view class="personal-list">
				<view v-for="item in personalList" :key="item.id" class="list">
					<view>{{item.num}}</view>
					<view>{{item.title}}</view>
				</view>
			</view>
		</view>
		<!-- 功能栏 -->
		<view class="personal-center">
			<view v-for="item in column" :key="item.id" class="column">
				<view><image :src="item.img_url" style="width: 80rpx; height: 80rpx;" mode=""></image></view>
				<view>{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: '',
			personalList:[
				{
					id:1,
					num:0,
					title:"余额"
				},
				{
					id:2,
					num:0,
					title:"积分"
				},
				{
					id:3,
					num:0,
					title:"优惠券"
				}
			],
			column:[
				{
					id:1,
					img_url:require("../../static/images/icon/tam.png"),
					title:"我的订单"
				},
				{
					id:2,
					img_url:require("../../static/images/icon/recharge.png"),
					title:"消费记录"
				},
				{
					id:3,
					img_url:require("../../static/images/icon/consumption.png"),
					title:"充值记录"
				},
				{
					id:4,
					img_url:require("../../static/images/icon/coupons.png"),
					title:"领券中心"
				},
				{
					id:5,
					img_url:require("../../static/images/icon/address.png"),
					title:"地址管理"
				},
				{
					id:6,
					img_url:require("../../static/images/icon/userinfo.png"),
					title:"基本信息"
				},
			]
		};
	},
	onShow() {
		// 获取本地存储(微信)
		uni.getStorage({
			key: 'userInfo',
			success: res => {
				// console.log(res.data);
				this.userInfo = res.data;
			}
		});
	},
	methods: {}
};
</script>

<style scoped>
/* 个人信息 */
.personal-userinfo {
	padding: 28rpx 0;
	box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.1);
}
.personal-info {
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.personal-info image {
	border-radius: 50%;
}
.personal-head {
	display: flex;
	align-items: center;
}
.personal-name {
	margin-left: 30rpx;
}
.personal-name view:last-child {
	font-size: 0.75rem;
}
.personal-vip {
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 0.75rem;
	color: #333333;
}
.personal-vip view:last-child{
	color: rgb(215, 36, 45);
}
.personal-vip .order-iconico {
	font-size: 2rem;
	color: #999999;
}
.level {
	margin-top: 10rpx;
}
.level text {
	background: rgb(215, 36, 45);
	padding: 5rpx 20rpx 5rpx 20rpx;
	border-radius: 50rpx;
	color: #ffffff;
}
.personal-list {
	display: flex;
	justify-content: space-around;
	padding-top: 50rpx;
	font-size: 0.875rem;
}
.personal-list .list {
	width: 30%;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.personal-list .list view:first-child{
	color: rgb(215, 36, 45);
	font-size: 1.25rem;
}
/* 功能栏 */
.personal-center {
	display: flex;
	flex-wrap: wrap;
	margin-top: 50rpx;
}
.personal-center .column {
	width: 30%;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 0.75rem;
	margin-top: 30rpx;
	margin-bottom: 30rpx;
	margin-left: 20rpx;
}
.personal-center .order-iconico {
	font-size: 2rem;
	color: #999999;
}
</style>
