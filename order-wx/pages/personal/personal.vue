<template>
	<view class="personal">
		<!-- 个人信息 -->
		<view class="personal-userinfo">
			<view class="personal-info">
				<view class="personal-head">
					<image :src="userInfo.avatarUrl" style="width: 120rpx; height: 120rpx;" mode=""></image>
					<view class="personal-name">
						<view>{{ userInfo.nickName }}</view>
					</view>
				</view>
			</view>
			<view class="personal-list">
				<view v-for="item in personalList" :key="item.id" class="list">
					<view>{{ item.num }}</view>
					<view>{{ item.title }}</view>
				</view>
			</view>
		</view>
		<!-- 功能组 -->
		<view class="activity-item">
			<u-grid :border="false" :col="3">
				<u-grid-item @click="gotoIndex(item.id)" v-for="item in activity" :key="item.id">
					<image :src="item.img_url" style="width: 68rpx; height: 68rpx;" mode=""></image>
					<view class="grid-text">{{ item.title }}</view>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: '',
			personalList: [
				{
					id: 1,
					num: 80,
					title: '余额'
				},
				{
					id: 2,
					num: 520,
					title: '积分'
				},
				{
					id: 3,
					num: 2,
					title: '卡券'
				}
			],
			activity: [
				{
					id: 1,
					img_url: require('@/static/images/personal_tam.png'),
					title: '订单管理'
				},
				{
					id: 2,
					img_url: require('@/static/images/personal_info.png'),
					title: '基本信息'
				}
			]
		};
	},
	onShow() {
		// 获取本地存储(微信)
		uni.getStorage({
			key: 'userInfo',
			success: res => {
				this.userInfo = res.data;
			}
		});
	},
	methods: {
		// 功能组页面跳转
		gotoIndex(index) {
			if (index === 1) {
				uni.switchTab({
					url: '/pages/tam/tam'
				});
			} else if (index === 2) {
				uni.navigateTo({
					url: '/pages/personalInfo/personalInfo'
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
/* 个人信息 */
.personal-userinfo {
	padding: 28rpx 0;
	box-shadow: 4rpx 6rpx 6rpx 0 rgba(0, 0, 0, 0.1);
}
.personal-info image {
	border-radius: 50%;
}
.personal-head {
	display: flex;
	align-items: center;
	justify-content: center;
}
.personal-name {
	margin-left: 30rpx;
}
.personal-name view:first-child {
	font-size: 1rem;
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
.personal-list .list view:first-child {
	color: #d81e06;
	font-size: 1.25rem;
}
// 功能组
.grid-text {
	font-size: 28rpx;
	margin-top: 4rpx;
	color: $u-type-info;
}
.activity-item {
	margin-top: 32rpx;
}
</style>
