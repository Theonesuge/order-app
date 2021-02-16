<template>
	<div class="home">
		<!-- 轮播图 -->
		<view style="height: 400rpx">
			<Swiper></Swiper>
		</view>
		<!-- 用户信息 -->
		<view class="userinfo" v-if="nickname">
			<view>
				<text>{{ getTime }},</text>
				{{ nickname }}
			</view>
		</view>
		<!-- 登录按钮 -->
		<view v-else class="login-button">
			<button open-type="getUserInfo" @getuserinfo="wxLogin()" withCredentials="true">登录</button>
		</view>
		<!-- 功能列表 -->
		<view class="home-function">
			<view v-for="item in functionList" :key="item.id" @click="gotoIndex(item.id)">
				<u-image width="80rpx" height="80rpx" :src="item.img_url"></u-image>
				<view>{{item.title}}</view>
			</view>
		</view>
		<!-- 精选活动 -->
		<view class="activity">
			<view class="activity-image">
				<view v-for="item in activity" :key="item.id">
					<u-image width="328rpx" height="265rpx" border-radius="5px" :fade="true" duration="450" :src="item.src">
						<u-loading slot="loading"></u-loading>
						<view slot="error" style="font-size: 24rpx;">{{ item.err }}</view>
					</u-image>
				</view>
			</view>
		</view>
		<!-- 更多服务 -->
		<view class="service">
			<view class="more-service"><view>更多服务</view></view>
			<view class="service-list">
				<view v-for="item in service" :key="item.id" @click="getfound(item.id)">
					<view><image :src="item.img_url" style="width: 80rpx; height: 80rpx;" mode=""></image></view>
					<view>{{item.title}}</view>
				</view>
			</view>
		</view>
	</div>
</template>

<script>
import config from '../../config/config.js';
import Swiper from '@/components/swiper/index.vue';
export default {
	components: {
		Swiper
	},
	data() {
		return {
			// 用户名
			nickname: '',
			// 精选活动
			activity: [
				{
					id: 1,
					src: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					err: '加载失败'
				},
				{
					id: 2,
					src: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					err: '加载失败'
				}
			],
			// 功能列表
			functionList:[
				{
					id: 1,
					img_url:require('@/static/images/card.png'),
					title: '个人卡包'
				},{
					id: 2,
					img_url:require('@/static/images/order.png'),
					title: '开始点餐'
				},{
					id: 3,
					img_url:require('@/static/images/mall.png'),
					title: '积分商城'
				}
			],
			service:[
				{
					id: 1,
					img_url: require('@/static/images/recharge.png'),
					title: '充值'
				},{
					id: 2,
					img_url: require('@/static/images/contact.png'),
					title: '联系我们'
				},
				{
					id: 1,
					img_url: require('@/static/images/take_out.png'),
					title: '外卖'
				},{
					id: 2,
					img_url: require('@/static/images/more.png'),
					title: '更多'
				}
			]
		};
	},
	// 第一次显示页面的时候调用，以后再次切换到该页面时，不会再调用这个函数
	onLoad() {},
	// 每次显示页面的时候都执行调用
	onShow() {
		// 获取本地登录状态
		this.getwxinfo();
	},
	methods: {
		// 登录授权
		wxLogin() {
			// 获取授权详情
			uni.getSetting({
				success: resAuth => {
					// 如果没有授权，不进行操作
					if (!resAuth.authSetting['scope.userInfo'] || resAuth.authSetting['scope.userInfo'] === false) {
						uni.hideLoading();
					} else {
						// 否则执行登录
						this.getUserInfo(); // 定义得具体登录逻辑
					}
				}
			});
		},

		// 允许授权执行回调函数
		getUserInfo() {
			let that = this;
			// uni.getProvider（）获取服务商信息判断手机端是否安装了app
			uni.getProvider({
				// oauth  代表授权登录
				service: 'oauth',
				success: function(res) {
					// 登录
					uni.login({
						// 表示授权方式  如果不设置则弹出登录列表选择界面
						provider: 'weixin',
						success: function(loginRes) {
							console.log(loginRes);
							let appid = config.appid;
							let secret = config.secret;
							let url =
								'https://api.weixin.qq.com/sns/jscode2session?appid=' +
								appid +
								'&secret=' +
								secret +
								'&js_code=' +
								loginRes.code +
								'&grant_type=authorization_code';
							if (loginRes.errMsg === 'login:ok') {
								that.$http(url, 'GET').then(res => {
									// console.log(res);
									uni.setStorage({
										//储存openid
										key: 'userOpenid',
										data: res.openid
									});
								});
							}
							// 获取用户信息
							uni.getUserInfo({
								provider: 'weixin',
								success: function(infoRes) {
									uni.setStorage({
										//缓存用户登陆状态
										key: 'userInfo',
										data: infoRes.userInfo
									});
									that.getwxinfo();
								}
							});
						}
					});
				}
			});
		},

		// 获取本地存储(微信)
		getwxinfo() {
			let that = this;
			uni.getStorage({
				key: 'userInfo',
				success: res => {
					that.nickname = res.data.nickName;
				}
			});
		},
		
		gotoIndex(index) {
			if (index === 1) {
				uni.navigateTo({
					url: '/pages/notFound/notFound'
				});
			} else if (index === 2) {
				uni.switchTab({
					url: '/pages/order/order'
				});
			} else {
				uni.navigateTo({
					url: '/pages/notFound/notFound'
				});
			}
		},
		
		getfound(index){
			if (index === 1) {
				uni.navigateTo({
					url: '/pages/notFound/notFound'
				});
			} else if (index === 2) {
				uni.navigateTo({
					url: '/pages/notFound/notFound'
				});
			} else if (index === 3) {
				uni.navigateTo({
					url: '/pages/notFound/notFound'
				});
			}else{
				uni.navigateTo({
					url: '/pages/notFound/notFound'
				});
			}
		}
	},
	computed: {
		// 获取时间
		getTime() {
			var date = new Date(),
				year = date.getFullYear(),
				month = date.getMonth() + 1,
				day = date.getDate(),
				hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
				minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
				second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
			month >= 1 && month <= 9 ? (month = '0' + month) : '';
			day >= 0 && day <= 9 ? (day = '0' + day) : '';
			var timer = hour + ':' + minute + ':' + second;
			if (timer >= '06:00:00' && timer < '11:00:00') {
				var name = '早上好';
			} else if (timer >= '11:00:00' && timer < '13:00:00') {
				var name = '中午好';
			} else if (timer >= '13:00:00' && timer < '18:00:00') {
				var name = '下午好';
			} else {
				var name = '晚上好';
			}
			return name;
		}
	}
};
</script>

<style lang="scss" scoped>
// 用户信息
.userinfo {
	text-align: center;
	margin-top: 50rpx;
	margin-bottom: 18rpx;
	padding-left: 20rpx;
	color: #d81e06;
	font-size: 1.25rem;
	text {
		color: #333333;
	}
}
// 登录按钮
.login-button {
	display: flex;
	justify-content: center;
	padding-top: 50rpx;
	padding-bottom: 18rpx;
	button{
		font-size: 0.875rem;
		color: #ffffff;
		background-color: #d81e06;
		padding-top: 40rpx;
		padding-bottom: 40rpx;
		padding-left: 80rpx;
		padding-right: 80rpx;
		line-height: 0;
	}
}
// 功能列表
.home-function {
	display: flex;
	justify-content: space-around;
	padding-top: 28rpx;
	padding-bottom: 28rpx;
	view {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.order-iconhuiyuan,
	.order-iconkabao1,
	.order-iconshangcheng {
		font-size: 2.28rem !important;
		color: #d81e06 !important;
	}
}
// 精选活动
.activity {
	width: 100%;
	margin-top: 18rpx;
	.activity-image {
		margin-top: 28rpx;
		margin-bottom: 28rpx;
		display: flex;
		justify-content: space-evenly;
	}
}
// 更多服务
.service {
	width: 100%;
	margin-top: 50rpx;
	.more-service {
		font-size: 0.875rem;
		margin-left: 36rpx;
	}
	.service-list {
		display: flex;
		justify-content: space-around;
		view {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 0.75rem;
			margin-top: 28rpx;
		}
		view > view:first-child {
			box-shadow: 0 0 16rpx 4rpx rgba(0, 0, 0, 0.1);
			padding: 18rpx;
			border-radius: 50%;
		}
		view > view:last-child {
			margin-bottom: 32rpx;
		}
	}
}
</style>
