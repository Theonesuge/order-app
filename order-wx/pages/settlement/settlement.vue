<template>
	<view class="settlement" :style="{height: device_height + 'px'}">
		<view class="settlement_box" :style="{height: settlement_height + 'px'}">
			<!-- 门店名字 -->
			<view class="restaurant">
				<view style="margin-right: 10rpx;" class="restaurant-one">
					<image src="@/static/images/shop.png" style="width: 50rpx;height: 50rpx" mode=""></image>
				</view>
				<view class="restaurant-two">
					<view class="restaurant-title">
						<view>自取</view>
						<view>旺城餐厅</view>
					</view>
					<view>
						距离你1.2公里，附近门店密集，请注意取餐门店是否正确 | 约5分钟后取餐
					</view>
				</view>
			</view>
			<!-- 就餐方式 -->
			<view class="mode">
				<view>
					<view style="font-weight: 600">就餐方式</view>
					<view @click="show = true">{{mode}}
						<u-icon name="arrow-right" color="#666666" size="28"></u-icon>
					</view>
				</view>
				<view>
					<view style="font-weight: 600">联系电话</view>
					<view @click="phone = true" style="color: #999999">
						<text v-if="number===''">请填写手机号</text>
						<text style="color: #333333;" v-else>{{number}}</text>
						<u-icon name="edit-pen" color="#999999" size="28"></u-icon>
					</view>
				</view>
			</view>
			<!-- 餐品详情 -->
			<view class="details-box">
				<view class="title">餐品详情</view>
				<view class="details">
					<view><text>奥堡辣翅蛋挞餐</text><text style="margin-left: 10rpx;color: #d81e06" @click="details">详情</text></view>
					<view style="color: #CCCCCC">x1</view>
					<view style="font-weight: 600">¥41.0</view>
				</view>
				<view v-if="showDetails === true" style="color: #999999;font-size: 0.75rem;">口味：原味</view>
				<view class="total"><text>小计</text><text>¥41.0</text></view>
			</view>
			<!-- 支付方式 -->
			<view class="payment">
				<view class="payment-top">
					<view><text style="margin-right: 10rpx;">支付方式</text><text>还需¥41.0</text></view>
					<view>
						<view style="margin-right: 10rpx;">
							<image src="@/static/images/wx.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
						</view>
						<view>微信支付</view>
					</view>
				</view>
				<view class="payment-center">
					<view>开票方式</view>
					<view>请在取餐时问服务员开票</view>
				</view>
				<view class="payment-bottom">
					<view>备注</view>
					<view @click="textarea = true">
						<text v-if="value === ''">口味、偏好等要求</text>
						<text v-else>{{value}}</text>
						<u-icon name="arrow-right" color="#999999" size="28"></u-icon>
					</view>
				</view>
			</view>
			<!-- 立即支付 -->
			<view class="pay">
				<view>¥41.0</view>
				<view @click="gopay">
					<view>立即支付</view>
					<view style="font-size: 0.6rem">Checkout</view>
				</view>
			</view>
			<!-- 就餐方式 -->
			<u-popup v-model="show" mode="bottom" :closeable="closeable" height="400rpx">
				<view class="pop-top">请选择就餐方式</view>
				<view class="pop-center">
					<view v-for="item in list" :key="item.id" @click="getindex(item.id)" :class="{ active: selectIndex === item.id }">{{item.name}}</view>
				</view>
				<view class="pop-button"><button @click="submit">确定</button></view>
			</u-popup>
			<!-- 联系电话 -->
			<u-popup v-model="phone" mode="center" :closeable="closeable" width="600rpx" height="300rpx">
				<view class="phone">
					<u-form :model="form" ref="uForm">
						<u-form-item label="电话" prop="phone">
							<u-input type="text" placeholder="请填写手机号" v-model="form.phone" />
						</u-form-item>
					</u-form>
				</view>
				<view class="pop-button"><button @click="submitPhone">确定</button></view>
			</u-popup>
			<!-- 备注 -->
			<u-popup v-model="textarea" mode="bottom" :closeable="closeable" width="600rpx" height="800rpx">
				<view class="remarks">备注</view>
				<view style="padding-left: 28rpx;width: 96%;margin-bottom: 18rpx;font-size: 0.75rem;">
					<u-input maxlength="28" placeholder="请输入口味、偏好等要求" v-model="value" :type="type" :border="border" :height="height"
					 :auto-height="autoHeight" />
				</view>
				<view style="color: #999999;font-size: 0.75rem;padding-left: 28rpx">快捷标签</view>
				<view class="select">
					<view v-for="(item,index) in select" :key="index" @click="changeSpan(index);" :class="{'active':spanIndex.indexOf(index)>-1}">{{item.name}}</view>
				</view>
				<view class="pop-button"><button @click="textarea = false">确定</button></view>
			</u-popup>
			<!-- 支付 -->
			<u-popup v-model="pay" mode="center" :mask-close-able="mask_close_able" :closeable="closeable" width="600rpx" height="300rpx">
				<view v-if="showFlower === false && success === false">
					<view style="text-align: center;padding: 50rpx 18rpx 0 18rpx;color:#d81e06;font-weight: 600;font-size: 1.125rem;">¥41.0</view>
					<view style="text-align: center;padding: 18rpx;">是否进行支付？</view>
					<button class="gopay" @click="submitPay">确定</button>
				</view>
				<view v-if="showFlower === true" style="text-align: center;margin-top: 120rpx;">
					<u-loading mode="flower" :showFlower="showFlower"></u-loading>
				</view>
				<view v-if="success === true" style="text-align: center;margin-top: 120rpx;">支付成功</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectIndex: 1,
				selectId: 0,
				settlement_height: '',
				device_height: '',
				value: '',
				mode: '',
				number: '',
				type: 'textarea',
				border: true,
				height: 200,
				autoHeight: true,
				mask_close_able: false,
				show: false,
				phone: false,
				textarea: false,
				closeable: true,
				showDetails: false,
				pay: false,
				success: false,
				showFlower: false,
				selectOne: '',
				selectTwo: '',
				spanIndex: [],
				select: [{
						id: 1,
						name: "不要辣"
					},
					{
						id: 2,
						name: "不加葱"
					}
				],
				list: [{
						id: 1,
						name: "店内就餐"
					},
					{
						id: 2,
						name: "打包带走"
					}
				],
				form: {
					phone: ''
				},
				// 手机号校验
				rules: {
					phone: [{
							required: true,
							message: '请输入你的手机号',
							trigger: ['change', 'blur'],
						},
						{
							max: 11,
							min: 11,
							message: '手机号为11位',
							trigger: ['change', 'blur'],
						},
						{
							pattern: /^[0-9]*$/g,
							message: '手机号只能为数字',
							trigger: ['change', 'blur'],
						},
					],
				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		created() {
			this.mode = this.list[0].name
		},
		onShow() {
			// 获取设备高度
			let _this = this
			uni.getStorage({
				key: 'device',
				success: res => {
					_this.device_height = res.data.windowHeight;
					let height = uni.createSelectorQuery().select('.settlement');
					height.boundingClientRect(data => {
						_this.settlement_height = data.height;
					}).exec();
				}
			})
		},
		methods: {
			getindex(id) {
				this.selectIndex = id;
			},
			submit() {
				if (this.selectIndex === 1) {
					this.mode = "店内就餐"
				} else {
					this.mode = "打包带走"
				}
				this.show = false
			},
			submitPhone() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('提交成功')
						this.phone = false
						this.number = this.form.phone
					} else {
						console.log('提交失败');
					}
				});
			},
			details() {
				this.showDetails = !this.showDetails
			},
			gopay() {
				this.pay = true
			},
			submitPay() {
				this.showFlower = true,
					this.closeable = false,
					setTimeout(() => {
						this.showFlower = false,
							this.success = true,
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/tam/tam'
								});
							}, 1000)
					}, 3000)
			},
			changeSpan(index) {
				let arrIndex = this.spanIndex.indexOf(index);
				console.log(arrIndex)
				if (arrIndex > -1) {
					this.spanIndex.splice(arrIndex, 1);
					console.log(this.spanIndex)
				} else {
					this.spanIndex.push(index);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 结算
	.settlement {
		background-color: #f8f8f8;

		.settlement_box {
			background-color: #f8f8f8;
		}

		.restaurant {
			width: 100%;
			display: flex;
			align-items: center;
			padding: 28rpx;
			background-color: #FFFFFF;
			border-radius: 0 0 50rpx 50rpx;
			box-shadow: 4rpx 6rpx 6rpx 0 rgba(0, 0, 0, 0.1);
		}

		.restaurant-two {
			margin-left: 28rpx;
		}

		.restaurant-two:last-child {
			font-size: 0.75rem;
		}

		.restaurant-title {
			display: flex;
			align-items: center;
			padding-bottom: 8rpx;

			view:first-child {
				border: 1rpx #d81e06 solid;
				padding-left: 10rpx;
				padding-right: 10rpx;
				color: #d81e06;
				margin-right: 10rpx;
			}

			view:last-child {
				font-size: 1rem;
				font-weight: bold;
			}
		}
	}

	.mode {
		width: 95%;
		margin: 0 auto;
		padding: 26rpx;
		margin-top: 20rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
	}

	.mode>view {
		display: flex;
		justify-content: space-between;
	}

	.mode>view:first-child {
		border-bottom: 1rpx #ececec solid;
		padding-bottom: 21rpx;
		margin-bottom: 21rpx;
	}

	.pop-center {
		display: flex;
		margin-bottom: 120rpx;

		view {
			border: 1rpx #999999 solid;
			color: #999999;
			padding-left: 28rpx;
			padding-right: 28rpx;
			padding-top: 12rpx;
			padding-bottom: 12rpx;
			border-radius: 28rpx;
			font-size: 0.75rem;
			margin-left: 28rpx;
		}
	}

	.pop-top {
		font-size: 0.875rem;
		color: #333333;
		font-weight: 600;
		padding: 28rpx;
	}

	.pop-button {
		width: 92%;
		margin: 0 auto;
	}

	.phone {
		padding: 28rpx;
		margin-bottom: 18rpx;
	}

	.details-box {
		width: 95%;
		margin: 0 auto;
		padding: 26rpx;
		margin-top: 20rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
	}

	.details {
		display: flex;
		justify-content: space-between;
	}

	.total {
		text-align: right;
		margin-top: 18rpx;

		text:first-child {
			font-size: 0.75rem;
			color: #CCCCCC;
			margin-right: 10rpx;
		}

		text:last-child {
			font-size: 1rem;
			font-weight: 600;
		}
	}

	.title {
		font-weight: 600;
		margin-bottom: 18rpx;
	}

	.payment {
		width: 95%;
		margin: 0 auto;
		padding: 26rpx;
		margin-top: 20rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;

		view {
			display: flex;
			justify-content: space-between;
		}
	}

	.payment-top,
	.payment-center {
		margin-bottom: 50rpx;
	}

	.payment-top {
		border-bottom: 1rpx #ececec solid;
		padding-bottom: 21rpx;
	}

	.payment-top view:last-child {
		display: flex;
		align-items: center;
	}

	.payment-center view:first-child {
		font-weight: 600;
	}

	.payment-center view:last-child {
		color: #999999;
	}

	.payment-bottom view:first-child {
		font-weight: 600;
	}

	.payment-bottom view:last-child {
		color: #999999;
	}

	.pay {
		width: 100%;
		padding: 18rpx;
		margin-top: 20rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		bottom: 0;
		box-shadow: 0 0 10rpx 4rpx rgba(0, 0, 0, 0.1);
	}

	.pay>view:first-child {
		color: #d81e06;
		font-size: 1.25rem;
	}

	.pay>view:last-child {
		background-color: #d81e06;
		color: #FFFFFF;
		font-size: 0.75rem;
		padding-left: 68rpx;
		padding-right: 68rpx;
		border-radius: 55rpx;
		padding-top: 8rpx;
		padding-bottom: 8rpx;
		text-align: center;
	}

	.remarks {
		font-size: 0.75;
		font-weight: 600;
		padding: 28rpx;
	}

	.select {
		display: flex;
		padding: 28rpx;
		margin-bottom: 120rpx;
	}

	.select>view {
		border: 1rpx solid #999999;
		color: #999999;
		font-size: 0.75rem;
		padding-left: 36rpx;
		padding-right: 36rpx;
		border-radius: 55rpx;
		padding-top: 15rpx;
		padding-bottom: 15rpx;
		text-align: center;
		margin-right: 28rpx;
	}

	button {
		font-size: 0.75rem;
		color: #ffffff;
		background-color: #d81e06;
		border-radius: 10rem;
		padding-top: 38rpx;
		padding-bottom: 38rpx;
		line-height: 0;
	}

	.gopay {
		width: 50%;
		font-size: 0.75rem;
		color: #ffffff;
		background-color: #d81e06;
		border-radius: 10rem;
		padding-top: 32rpx;
		padding-bottom: 32rpx;
		line-height: 0;
		margin-top: 28rpx;
	}

	.active {
		background-color: #d81e06;
		color: #FFFFFF !important;
		border: 1rpx #d81e06 solid !important;
	}
</style>
