"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletDataBase = void 0);
const UE = require("ue"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils");
class BulletDataBase {
	constructor(t) {
		(this.z5o = void 0),
			(this.Z5o = void 0),
			(this.eVo = void 0),
			(this.tVo = void 0),
			(this.iVo = void 0),
			(this.oVo = void 0),
			(this.rVo = void 0),
			(this.nVo = void 0),
			(this.sVo = void 0),
			(this.aVo = void 0),
			(this.n6 = void 0),
			(this.IsOversizeForTrace = !1),
			(this.kJ = void 0),
			(this.hVo = void 0),
			(this.lVo = 0),
			(this._Vo = !1),
			(this.uVo = void 0),
			(this.cVo = !1),
			(this.mVo = ""),
			(this.BulletCamp = void 0),
			(this.dVo = void 0),
			(this.CVo = void 0),
			(this.gVo = void 0),
			(this.fVo = 0),
			(this.pVo = !1),
			(this.vVo = void 0),
			(this.MVo = void 0),
			(this.SVo = !1),
			(this.EVo = void 0),
			(this.yVo = !1),
			(this.IVo = void 0),
			(this.TVo = void 0),
			(this.LVo = void 0),
			(this.DVo = void 0),
			(this.RVo = !1),
			(this.UVo = void 0),
			(this.AVo = void 0),
			(this.PVo = void 0),
			(this.xVo = void 0),
			(this.wVo = void 0),
			(this.BVo = void 0),
			(this.bVo = void 0),
			(this.qVo = void 0),
			(this.GVo = void 0),
			(this.NVo = !1),
			(this.OVo = void 0),
			(this.kVo = 0),
			(this.FVo = !1),
			(this.VVo = void 0),
			(this.Pe = t);
	}
	get IgnoreGradient() {
		return void 0 === this.z5o && (this.z5o = this.Pe.不适配坡度), this.z5o;
	}
	get CenterOffset() {
		return (
			this.Z5o || (this.Z5o = Vector_1.Vector.Create(this.Pe.中心位置偏移)),
			this.Z5o
		);
	}
	get DamageId() {
		return void 0 === this.eVo && (this.eVo = this.Pe.伤害ID), this.eVo;
	}
	get EnablePartHitAudio() {
		return (
			void 0 === this.tVo && (this.tVo = this.Pe.是否响应材质受击音效), this.tVo
		);
	}
	get IntervalAfterHit() {
		return (
			void 0 === this.iVo && (this.iVo = this.Pe.作用间隔基于个体), this.iVo
		);
	}
	get Interval() {
		return void 0 === this.oVo && (this.oVo = this.Pe.作用间隔), this.oVo;
	}
	get ShareCounter() {
		return void 0 === this.rVo && (this.rVo = this.Pe.共享父子弹次数), this.rVo;
	}
	get BornPosition() {
		return (
			this.nVo || (this.nVo = Vector_1.Vector.Create(this.Pe.出生位置偏移)),
			this.nVo
		);
	}
	get BornPositionStandard() {
		return void 0 === this.sVo && (this.sVo = this.Pe.出生位置基准), this.sVo;
	}
	get BornPositionRandom() {
		return (
			this.aVo || (this.aVo = Vector_1.Vector.Create(this.Pe.出生位置随机)),
			this.aVo
		);
	}
	get Size() {
		return (
			this.n6 || (this.n6 = Vector_1.Vector.Create(this.Pe.初始大小)), this.n6
		);
	}
	get Rotator() {
		return (
			this.kJ || (this.kJ = Rotator_1.Rotator.Create(this.Pe.初始旋转)), this.kJ
		);
	}
	get VictimCount() {
		return void 0 === this.hVo && (this.hVo = this.Pe.命中个数), this.hVo;
	}
	get HitConditionTagId() {
		return this.HVo(), this.lVo;
	}
	HVo() {
		var t;
		this._Vo ||
			((this._Vo = !0),
			(t = this.Pe.命中判定Tag)?.TagName !== StringUtils_1.NONE_STRING
				? (this.lVo = t.TagId)
				: (this.lVo = 0));
	}
	get HitType() {
		return void 0 === this.uVo && (this.uVo = this.Pe.命中判定类型), this.uVo;
	}
	get DaHitTypePreset() {
		return this.jVo(), this.mVo;
	}
	jVo() {
		var t;
		this.cVo ||
			((this.cVo = !0),
			(this.mVo = this.Pe.命中判定类型预设.ToAssetPathName()),
			0 < this.mVo?.length &&
				((t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
					this.mVo,
					UE.BulletCampType_C,
				)),
				(this.BulletCamp = t?.阵营)));
	}
	get RelativeDirection() {
		return void 0 === this.dVo && (this.dVo = this.Pe.子弹受击方向), this.dVo;
	}
	get Shape() {
		return void 0 === this.CVo && (this.CVo = this.Pe.子弹形状), this.CVo;
	}
	get AttackDirection() {
		return (
			this.gVo || (this.gVo = Rotator_1.Rotator.Create(this.Pe.子弹攻击方向)),
			this.gVo
		);
	}
	get TagId() {
		return this.WVo(), this.fVo;
	}
	WVo() {
		var t;
		this.pVo ||
			((this.pVo = !0),
			(t = this.Pe.子弹标签)?.TagName !== StringUtils_1.NONE_STRING
				? (this.fVo = t.TagId)
				: (this.fVo = 0));
	}
	get BornRequireTagIds() {
		return this.KVo(), this.vVo;
	}
	get BornForbidTagIds() {
		return this.KVo(), this.MVo;
	}
	KVo() {
		if (!this.SVo) {
			this.SVo = !0;
			var t = this.Pe.子弹禁止生成Tag;
			if (t) {
				var i = t.GameplayTags,
					o = i.Num();
				if (0 < o) {
					this.MVo = [];
					for (let t = 0; t < o; t++) {
						var s = i.Get(t);
						s?.TagId && this.MVo.push(s.TagId);
					}
				}
			}
			if ((t = this.Pe.子弹允许生成Tag)) {
				var e = t.GameplayTags,
					h = e.Num();
				if (0 < h) {
					this.vVo = [];
					for (let t = 0; t < h; t++) {
						var r = e.Get(t);
						r?.TagId && this.vVo.push(r.TagId);
					}
				}
			}
		}
	}
	get HitEffectWeakness() {
		return (
			this.yVo || ((this.yVo = !0), (this.EVo = this.Pe.弱点被击效果)), this.EVo
		);
	}
	get HitCountMax() {
		return void 0 === this.IVo && (this.IVo = this.Pe.总作用次数限制), this.IVo;
	}
	get DestroyOnSkillEnd() {
		return (
			void 0 === this.TVo && (this.TVo = this.Pe.技能结束是否销毁子弹), this.TVo
		);
	}
	get Duration() {
		return void 0 === this.LVo && (this.LVo = this.Pe.持续时间), this.LVo;
	}
	get BlackboardKey() {
		return (
			this.RVo || ((this.RVo = !0), (this.DVo = this.Pe.攻击者黑板Key值)),
			this.DVo
		);
	}
	get ContinuesCollision() {
		return void 0 === this.UVo && (this.UVo = this.Pe.是否持续碰撞), this.UVo;
	}
	get StickGround() {
		return void 0 === this.PVo && (this.PVo = this.Pe.是否贴地子弹), this.PVo;
	}
	get StickTraceLen() {
		return void 0 === this.AVo && (this.AVo = this.Pe.贴地探测距离), this.AVo;
	}
	get HitCountPerVictim() {
		return (
			void 0 === this.xVo && (this.xVo = this.Pe.每个单位总作用次数), this.xVo
		);
	}
	get SpecialParams() {
		if (!this.wVo) {
			this.wVo = new Map();
			var t = this.Pe.特殊参数;
			for (let o = 0; o < t.Num(); o++) {
				var i = t.GetKey(o);
				this.wVo.set(i, t.Get(i));
			}
		}
		return this.wVo;
	}
	get CollisionActiveDelay() {
		return void 0 === this.BVo && (this.BVo = this.Pe.碰撞判定延迟), this.BVo;
	}
	get CollisionActiveDuration() {
		return void 0 === this.bVo && (this.bVo = this.Pe.碰撞判定时长), this.bVo;
	}
	get SyncType() {
		return void 0 === this.qVo && (this.qVo = this.Pe.网络同步类型), this.qVo;
	}
	get BeHitEffect() {
		return (
			this.NVo || ((this.NVo = !0), (this.GVo = this.Pe.被击效果)), this.GVo
		);
	}
	get BornDistLimit() {
		return (
			this.OVo || (this.OVo = Vector_1.Vector.Create(this.Pe.限制生成距离)),
			this.OVo
		);
	}
	get BanHitTagId() {
		return this.QVo(), this.kVo;
	}
	QVo() {
		var t;
		this.FVo ||
			((this.FVo = !0),
			(t = this.Pe.禁止命中Tag)?.TagName !== StringUtils_1.NONE_STRING
				? (this.kVo = t.TagId)
				: (this.kVo = 0));
	}
	get DebugShowProgress() {
		return (
			void 0 === this.VVo && (this.VVo = this.Pe.Debug显示子弹进度), this.VVo
		);
	}
	Preload() {
		return (
			this.jVo(),
			this.KVo(),
			this.HVo(),
			this.QVo(),
			this.CenterOffset,
			this.Interval,
			this.ShareCounter,
			this.BornPosition,
			this.BornPositionStandard,
			this.BornPositionRandom,
			this.Size,
			this.Rotator,
			this.HitType,
			this.Shape,
			this.TagId,
			this.Duration,
			this.CollisionActiveDelay,
			this.CollisionActiveDuration,
			this.SyncType,
			this.BornDistLimit,
			!0
		);
	}
}
exports.BulletDataBase = BulletDataBase;
