"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletDataLogic = void 0);
const UE = require("ue"),
	Info_1 = require("../../../../Core/Common/Info"),
	Log_1 = require("../../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils");
class BulletDataLogic {
	constructor(t) {
		(this.Data = void 0),
			(this.m6o = void 0),
			(this.d6o = !1),
			(this.C6o = void 0),
			(this.g6o = void 0),
			(this.f6o = void 0),
			(this.p6o = void 0),
			(this.v6o = !1),
			(this.M6o = void 0),
			(this.S6o = void 0),
			(this.E6o = void 0),
			(this.y6o = void 0),
			(this.I6o = void 0),
			(this.T6o = void 0),
			(this.L6o = void 0),
			(this.D6o = void 0),
			(this.R6o = !1),
			(this.U6o = void 0),
			(this.A6o = void 0),
			!Info_1.Info.IsBuildDevelopmentOrDebug ||
			(t && UE.KismetSystemLibrary.IsValidSoftObjectReference(t))
				? ((this.Data = ResourceSystem_1.ResourceSystem.SyncLoad(
						t.ToAssetPathName(),
						UE.BulletLogicType_C,
					)),
					Info_1.Info.IsBuildDevelopmentOrDebug &&
						!this.ProfileName.toString().toLowerCase().startsWith("bullet_") &&
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Bullet",
							21,
							"子弹配置出错，逻辑设置.预设.子弹碰撞预设 填写的值不对",
							["配置路径:", t.ToAssetPathName()],
						))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Bullet", 21, "子弹配置出错，没有配置逻辑设置.预设", [
						"配置路径:",
						t.ToAssetPathName(),
					]);
	}
	get ComponentName() {
		return (
			this.d6o || ((this.d6o = !0), (this.m6o = this.Data.只碰撞胶囊体)),
			this.m6o
		);
	}
	get HitDirectionType() {
		return (
			void 0 === this.C6o && (this.C6o = this.Data.子弹受击类型角度判断),
			this.C6o
		);
	}
	get DestroyOnHitCharacter() {
		return (
			void 0 === this.g6o && (this.g6o = this.Data.子弹碰撞单位销毁), this.g6o
		);
	}
	get DestroyOnHitObstacle() {
		return (
			void 0 === this.f6o && (this.f6o = this.Data.子弹碰撞障碍销毁), this.f6o
		);
	}
	get ProfileName() {
		return (
			this.v6o || ((this.v6o = !0), (this.p6o = this.Data.子弹碰撞预设)),
			this.p6o
		);
	}
	get Type() {
		return void 0 === this.M6o && (this.M6o = this.Data.子弹类型), this.M6o;
	}
	get InteractWithWater() {
		return void 0 === this.S6o && (this.S6o = this.Data.开启水面交互), this.S6o;
	}
	get ReboundChannel() {
		return void 0 === this.E6o && (this.E6o = this.Data.弹反通道), this.E6o;
	}
	get CanCounterAttack() {
		return (
			void 0 === this.y6o && (this.y6o = this.Data.是否可以触发拼刀), this.y6o
		);
	}
	get CanVisionCounterAttack() {
		return (
			void 0 === this.I6o && (this.I6o = this.Data.是否可以触发对策), this.I6o
		);
	}
	get CanDodge() {
		return (
			void 0 === this.T6o && (this.T6o = this.Data.是否可以触发极限闪避),
			this.T6o
		);
	}
	get DestroyOnCountZero() {
		return (
			void 0 === this.L6o && (this.L6o = this.Data.次数为0时销毁), this.L6o
		);
	}
	get PresentTagIds() {
		return this.P6o(), this.D6o;
	}
	P6o() {
		if (!this.R6o) {
			(this.R6o = !0), (this.D6o = []);
			var t,
				o = this.Data.预设标签.GameplayTags,
				i = o.Num();
			for (let e = 0; e < i; e++)
				o.IsValidIndex(e) &&
					(t = o.Get(e)).TagName !== StringUtils_1.NONE_STRING &&
					this.D6o.push(t.TagId);
		}
	}
	get IgnoreWater() {
		return void 0 === this.U6o && (this.U6o = this.Data.忽略水体), this.U6o;
	}
	get DestroyOnFrozen() {
		return void 0 === this.A6o && (this.A6o = this.Data.冰冻时销毁), this.A6o;
	}
	Preload() {
		this.P6o();
	}
}
exports.BulletDataLogic = BulletDataLogic;
