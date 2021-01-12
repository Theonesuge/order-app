<template>
	<view>
		<!-- 轮播图 -->
		<Swiper />
		<!-- 用户信息 -->
		<view v-if="nickname" class="userinfo">
			<view>
				<text style="color: #333333;">{{ getTime }},</text>
				{{ nickname }}
			</view>
		</view>
		<view v-else class="userlogin"><button open-type="getUserInfo" @getuserinfo="wxLogin()" withCredentials="true">请登录</button></view>
		<!-- 更多功能 -->
		<view class="personal-list">
			<view v-for="item in personalList" :key="item.id">
				<navigator :url="item.url">
					<image :src="item.img_url" style="width: 80rpx;height: 80rpx;" mode=""></image>
					<view>{{ item.text }}</view>
				</navigator>
			</view>
		</view>
		<!-- 活动列表 -->
		<scroll-view scroll-x="true" class="activity" scroll-left="0">
			<view v-for="item in activity" :key="item.id"><image :src="item.img_url" style="width: 300rpx;height: 228rpx;" mode=""></image></view>
		</scroll-view>
	</view>
</template>

<script>
import config from '../../config/config.js'
import Swiper from '../../components/swiper/swiper.vue';
export default {
	components: {
		Swiper
	},
	data() {
		return {
			// 用户名
			nickname: '',
			personalList: [
				{
					id: 1,
					url: '',
					img_url: require('../../static/images/icon/card.png'),
					text: '我的卡包'
				},
				{
					id: 2,
					url: '/pages/tam/tam',
					img_url: require('../../static/images/icon/vip.png'),
					text: '会员码'
				},
				{
					id: 3,
					url: '/pages/personal/personal',
					img_url: require('../../static/images/icon/mall.png'),
					text: '积分商城'
				}
			],
			activity: [
				{ id: 1, img_url: require('../../static/images/banner.jpg') },
				{ id: 2, img_url: require('../../static/images/banner.jpg') },
				{ id: 3, img_url: require('../../static/images/banner.jpg') }
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
		getPhoneNumber(e) {
			console.log(e);
		},
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
							console.log(that)
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
									console.log(res);
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
									console.log(infoRes);
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
					console.log(res);
					that.nickname = res.data.nickName;
				}
			});
		}
	},
	computed: {
		// getTime当成data的一个属性
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

<style scoped>
/* 轮播图样式 */
view swiper {
	height: 400rpx;
}
/* 用户信息 */
.userinfo {
	display: flex;
	justify-content: space-around;
	font-size: 1.125rem;
	padding: 60rpx 0 50rpx 0;
}
/* 登录 */
.userlogin button {
	margin-top: 30rpx;
	margin-bottom: 30rpx;
	font-size: 1.125rem;
	line-height: normal;
	background-color: #ffffff;
	color: rgb(215, 36, 45);
	font-weight: 500;
}
.userlogin button::after {
	border: 1px solid #ffffff;
}
.userinfo view:last-child,
.userinfo view:first-child {
	color: rgb(215, 36, 45);
	font-weight: 500;
}
/* 按钮样式 */
.start-order {
	margin: 20rpx 40rpx 60rpx;
	color: #ffffff;
	background-color: rgb(215, 36, 45);
	border-radius: 50rpx;
	line-height: 60rpx;
	padding-top: 12rpx;
	padding-bottom: 12rpx;
	box-shadow: 0px 12px 12px rgba(215, 36, 45, 0.46);
}
/* 个人列表样式 */
.personal-list {
	display: flex;
	justify-content: space-around;
	margin-top: 8rpx;
}
.personal-list view {
	text-align: center;
	font-size: 0.75rem;
	color: #333333;
}
/* 活动列表 */
.activity {
	margin-top: 50rpx;
	white-space: nowrap;
}
.activity view {
	margin-right: 55rpx;
	display: inline-block;
}
.activity view:first-child {
	margin-left: 45rpx;
}
.activity view image {
	border-radius: 8rpx;
	box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.1);
}
.user-wx {
	margin-left: 0;
	margin-right: 0;
	padding-left: 0;
	padding-right: 0;
	font-size: 0.75rem;
	line-height: none;
	background-color: #ffffff;
}
</style>
