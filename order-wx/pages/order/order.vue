<template>
	<view class="order">
		<!-- 所在地区 -->
		<view class="order-address">
			<view class="address">
				<view>所在地区：{{ Area }}</view>
				<view>
					<u-icon name="map" color="#d81e06" size="36"></u-icon>
					<text>位置：{{ Areaaddress }}</text>
				</view>
			</view>
			<view class="order-search">
				<u-icon label="搜索" label-size="32" name="search" color="#d81e06" size="36"></u-icon>
			</view>
		</view>
		<!-- 点餐列表 -->
		<view class="order-list">
			<!-- 左侧 -->
			<scroll-view class="left" :style="{height:order_height-55 + 'px'}" scroll-y>
				<view v-for="item in orderTitle" :key="item.id" @click="getId(item.id)" :class="{ active: selectIndex === item.id }"
				 class="oreder-title">
					<view>
						<image :src="item.img_url" style="width: 60rpx;height: 60rpx" mode=""></image>
					</view>
					<view>{{ item.title }}</view>
				</view>
			</scroll-view>
			<!-- 右侧 -->
			<scroll-view class="right" :style="{height:order_height-55 + 'px'}" scroll-y>
				<view v-for="food in foods" :key="food.id" class="right-list">
					<view>
						<u-image width="260rpx" height="180rpx" :fade="true" duration="450" :src="food.img_url">
							<u-loading slot="loading"></u-loading>
							<view slot="error" style="font-size: 24rpx;">加载失败</view>
						</u-image>
					</view>
					<view class="order-name">
						<view>{{ food.name }}</view>
						<view>
							¥{{ food.price }}
							<text style="font-size: 0.75rem">起</text>
						</view>
						<view class="operation">
							<view @click="reduce(food)" v-if="food.count > 0">
								<image src="@/static/images/remove.png" style="width: 50rpx;height: 50rpx;" mode=""></image>
							</view>
							<view v-if="food.count > 0" style="font-size: 0.875rem;">{{ food.count }}</view>
							<view @click="addfood(food)">
								<image src="@/static/images/add.png" style="width: 50rpx;height: 50rpx;" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 购物车 -->
		<view v-if="totalCount > 0" class="cart-box">
			<!-- 列表详情 -->
			<view v-for="food in getCount" :key="food.id" v-if="cartList === true" class="card-details">
				<view>{{food.name}}<text v-if="food.flavor">({{food.flavor}})</text></view>
				<view style="margin-left: 28rpx">¥{{food.price}}</view>
				<view class="operation">
					<view @click="reduce(food)">
						<image src="@/static/images/remove.png" style="width: 50rpx;height: 50rpx" mode=""></image>
					</view>
					<view style="color: #d81e06">{{food.count}}</view>
					<view @click="addfood(food)">
						<image src="@/static/images/add.png" style="width: 50rpx;height: 50rpx" mode=""></image>
					</view>
				</view>
			</view>
			<view class="cart">
				<view @click="showlist" class="cart-img">
					<image src="@/static/images/cart.png" style="width: 88rpx;height: 88rpx" mode=""></image>
					<text>{{ totalCount }}</text>
				</view>
				<view>¥{{ totalPrice }}.00</view>
				<view><text @click="settlement">结算</text></view>
			</view>
		</view>
		<!-- 弹框选项 -->
		<Popup :poplist="poplist" :show="show" @popdata="popdata" @close="close" :firstflavor="firstflavor"></Popup>
	</view>
</template>

<script>
	import Popup from '@/components/popup/index.vue'
	export default {
		components: {
			Popup
		},
		data() {
			return {
				// 地区
				Area: '',
				// 地址信息
				Areaaddress: '',
				firstflavor:'',
				cartList: false,
				selectIndex: 1,
				order_height: 0,
				show: false,
				poplist: '',
				orderTitle: [{
						id: 1,
						img_url: require('@/static/images/food_1.png'),
						title: '布丁'
					},
					{
						id: 2,
						img_url: require('@/static/images/food_2.png'),
						title: '汉堡'
					},
					{
						id: 3,
						img_url: require('@/static/images/food_3.png'),
						title: '鸡腿'
					},
					{
						id: 4,
						img_url: require('@/static/images/food_4.png'),
						title: '饮料'
					},
					{
						id: 5,
						img_url: require('@/static/images/food_5.png'),
						title: '薯条'
					},
					{
						id: 6,
						img_url: require('@/static/images/food_6.png'),
						title: '热狗'
					},
					{
						id: 7,
						img_url: require('@/static/images/food_7.png'),
						title: '蛋糕'
					},
					{
						id: 8,
						img_url: require('@/static/images/food_8.png'),
						title: '面包'
					}
				],
				foods: [{
						id: 1,
						count: 0,
						name: '人气餐鸡腿堡',
						price: 39.0,
						flavor:'',
						img_url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						specifications: [{
								id: 1,
								flavor: '原味'
							},
							{
								id: 2,
								flavor: '大片鸡肉'
							}
						]
					},
					{
						id: 2,
						count: 0,
						name: '人气餐鸡腿堡',
						price: 39.0,
						img_url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					},
					{
						id: 3,
						count: 0,
						name: '人气餐鸡腿堡',
						price: 39.0,
						flavor:'',
						img_url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						specifications: [{
								id: 1,
								flavor: '原味'
							},
							{
								id: 2,
								flavor: '大片鸡肉'
							}
						]
					},
					{
						id: 4,
						count: 0,
						name: '人气餐鸡腿堡',
						price: 39.0,
						img_url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					},
					{
						id: 5,
						count: 0,
						name: '人气餐鸡腿堡',
						price: 39.0,
						img_url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					}
				]
			};
		},
		onShow() {
			// 获取设备高度
			uni.getStorage({
				key: 'device',
				success: res => {
					this.order_height = res.data.windowHeight;
				}
			});
		},
		mounted() {
			this.getLocationInfo();
		},
		methods: {
			getId(id) {
				this.selectIndex = id;
			},
			showlist() {
				this.cartList = !this.cartList;
			},
			//获取地理位置
			getLocationInfo() {
				var that = this;
				uni.getLocation({
					data: {
						type: 'wgs84'
					},
					success(res) {
						let latitude = res.latitude.toString();
						let longitude = res.longitude.toString();
						let url = 'http://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude +
							'&key=MVGBZ-R2U3U-W5CVY-2PQID-AT4VZ-PDF35';
						that.$http(url, 'GET').then(res => {
							console.log(res);
							that.Areaaddress = res.result.address_component.city + res.result.address_component.district + res.result.address_component
								.street;
							that.Area = res.result.address_component.province;
						});
					}
				});
			},
			addfood(food) {
				this.poplist = food;
				if (food.specifications) {
					this.firstflavor = food.specifications[0].flavor;
					this.show = true;
				} else {
					food.count++;
				}
			},
			reduce(food) {
				food.count--;
			},
			popdata(data, flavor, showpop) {
				console.log(data, flavor, showpop)
				this.poplist.count = data
				this.poplist.flavor = flavor
			},
			close(showpop) {
				this.show = showpop
			},
			settlement(){
				uni.navigateTo({
					url: '/pages/settlement/settlement'
				});
			}
		},
		computed: {
			// 获取数量
			getCount() {
				let list = [];
				this.foods.forEach(food => {
					if (food.count > 0) {
						list.push(food);
					}
				});
				return list;
			},
			// 计算个数
			totalCount() {
				let num = 0;
				this.getCount.forEach(food => {
					num += food.count;
				});
				return num;
			},
			// 计算金额
			totalPrice() {
				let total = 0;
				this.getCount.forEach(food => {
					total += food.price * food.count;
				});
				return total;
			}
		}
	};
</script>

<style lang="scss" scoped>
	/* 选中样式变色 */
	.active {
		background-color: #ffffff;
		color: #d81e06 !important;
	}

	// 地址
	.order-address {
		display: flex;
		justify-content: space-between;
		padding: 18rpx;
		margin-bottom: 8rpx;
		box-shadow: 3rpx 3rpx 3rpx 0 rgba(0, 0, 0, 0.1);
	}

	.address {
		font-size: 0.75rem;

		view:first-child {
			margin-left: 8rpx;
			margin-bottom: 8rpx;
		}

		view:last-child {
			display: flex;
			align-items: center;

			text:last-child {
				overflow: hidden !important;
				text-overflow: ellipsis !important;
				display: -webkit-box !important;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
			}
		}
	}

	// 搜索
	.order-search {
		display: flex;
		align-items: center;
	}

	// 点餐列表
	.order-list {
		.left {
			width: 22%;
			position: fixed;
			background: rgb(247, 247, 247);
		}

		.oreder-title {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 25rpx;
			color: #666666;
			padding: 28rpx 0;
		}

		.oreder-title:last-child {
			padding-bottom: 200rpx;
		}

		.right {
			width: 78%;
			float: right;
			position: fixed;
			margin-left: 22%;
		}

		.right-list {
			display: flex;
			justify-content: space-between;
			margin: 28rpx;
			border-radius: 10rpx;
			box-shadow: 0 0 16rpx 4rpx rgba(0, 0, 0, 0.1);
		}

		.right-list>view:first-child {
			padding: 18rpx 28rpx 18rpx 18rpx;
		}

		.right-list:last-child {
			margin-bottom: 200rpx;
		}

		.order-name {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			justify-content: space-around;
			margin-right: 20rpx;

			view:nth-child(1) {
				font-size: 0.875rem;
				font-weight: 600;
			}

			view:nth-child(2) {
				font-size: 0.875rem;
				color: #d81e06;
			}
		}

		.operation {
			display: flex;

			view {
				display: flex;
				align-items: center;
			}
		}
	}

	/* 购物车 */
	.cart-box {
		width: 100%;
		position: absolute;
		bottom: 0;
	}

	.cart {
		display: flex;
		align-items: center;
		padding-top: 36rpx;
		padding-bottom: 36rpx;
		padding-left: 28rpx;
		background: rgb(241, 241, 241);
		border-top: 1rpx #e3e3e3 solid;

		view:nth-child(1) {
			border-radius: 50%;
			background-color: #ffffff;
			padding: 10rpx;
			position: absolute;
			bottom: 28rpx;
			display: flex;
			align-items: center;
		}

		view:nth-child(2) {
			flex-grow: 2;
			padding-left: 20%;
		}

		view:nth-child(3) {
			text {
				margin-right: 28rpx;
				border-radius: 36rpx;
				background-color: #d81e06;
				color: #ffffff;
				padding: 18rpx 68rpx;
			}
		}

		.cart-img text {
			width: 36rpx;
			height: 36rpx;
			background-color: #d81e06;
			color: #ffffff;
			position: absolute;
			border-radius: 50%;
			text-align: center;
			line-height: 36rpx;
			font-size: 20rpx;
			top: 0;
			right: -16rpx;
		}
	}

	.card-details {
		width: 100%;
		background: rgb(241, 241, 241);
		display: flex;
		align-items: center;
		padding-top: 25rpx;
		padding-bottom: 25rpx;
		padding: 30rpx;
		padding: 30rpx;
	}

	.card-details>view:nth-child(1) {
		font-size: 0.75rem;
		width: 300rpx;
	}

	.card-details>view:nth-child(2) {
		color: #d81e06;
		flex-grow: 1;
	}
	
	.operation {
		display: flex;
	
		view {
			display: flex;
			align-items: center;
		}
	}
</style>
