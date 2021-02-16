<template>
	<view class="personal-info">
		<view class="personal-avatar"><u-image shape="circle" width="120rpx" height="120rpx" :src="user.avatarUrl"></u-image></view>
		<u-form :model="form" ref="uForm">
			<u-form-item label="昵称" prop="name"><u-input v-model="form.name" :disabled="disabled" /></u-form-item>
			<u-form-item label="性别">
				<u-radio-group v-model="form.sex">
					<u-radio v-for="(item, index) in sexList" :key="index" :name="item.name">{{ item.name }}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="电话" prop="telephone"><u-input placeholder="请输入手机号码" v-model="form.telephone" /></u-form-item>
			<u-form-item label="简介" prop="intro"><u-input placeholder="请输入简介" v-model="form.intro" /></u-form-item>
			<u-form-item label="生日" prop="birthday"><u-input class="birthday" :disabled="disabled" @click="show = true" placeholder="请选择生日" v-model="form.birthday" /><u-icon name="arrow-right" color="#cccccc" size="28"></u-icon></u-form-item>
			<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		</u-form>
		<view style="margin-top: 50rpx"><button @click="submit">提交</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			user: '',
			show: false,
			mode: 'date',
			disabled:true,
			form: {
				name: '',
				intro: '',
				sex: '',
				telephone: '',
				birthday:''
			},
			sexList: [
				{
					name: '男',
					disabled: false
				},
				{
					name: '女',
					disabled: false
				}
			],
			// 表单校验
			rules: {
				name: [
					{
						required: true,
						message: '请输入姓名',
						trigger: ['change']
					}
				],
				intro: [
					{
						min: 5,
						message: '简介不能少于5个字',
						trigger: ['change', 'blur']
					},
					{
						required: true,
						message: '请输入简介',
						trigger: ['change']
					}
				],
				telephone: [
					{
						min: 11,
						message: '电话不能少于11位',
						trigger: ['change', 'blur']
					},
					{
						required: true,
						message: '请输入电话号码',
						trigger: ['change']
					}
				],
				birthday:[
					{
						required: true,
						message: '请选择生日',
						trigger: ['change']
					}
				]
			}
		};
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	onShow() {
		// 获取本地登录状态
		this.getwxinfo();
	},
	methods: {
		// 提交表单
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证通过');
				} else {
					console.log('验证失败');
				}
			});
		},
		// 获取日期
		change(e) {
			this.form.birthday = e.result
		},
		// 获取本地存储(微信)
		getwxinfo() {
			let that = this;
			uni.getStorage({
				key: 'userInfo',
				success: res => {
					that.user = res.data;
					console.log(that.user);
					that.form.name = res.data.nickName;
					if (res.data.gender === 1) {
						that.form.sex = '男';
					} else {
						that.form.sex = '女';
					}
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
// 表单样式 
.personal-info {
	width: 90%;
	margin: 0 auto;
	.personal-avatar {
		display: flex;
		justify-content: center;
		margin-top: 36rpx;
		margin-bottom: 8rpx;
	}
	button {
		font-size: 0.875rem;
		color: #ffffff;
		background-color: #d81e06;
		border-radius: 10rem;
		padding-top: 40rpx;
		padding-bottom: 40rpx;
		line-height: 0;
	}
	.title {
		color: $u-type-primary;
		text-align: center;
		padding: 20rpx 0 0 0;
	}
	u-icon {
		position: absolute;
		top: 42rpx;
	    right: 0;
	}
}
</style>
