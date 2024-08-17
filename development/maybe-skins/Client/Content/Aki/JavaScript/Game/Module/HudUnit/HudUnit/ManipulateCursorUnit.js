"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ManipulateCursorUnit = void 0);
const UE = require("ue"),
	Time_1 = require("../../../../Core/Common/Time"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
	CombineKeyItem_1 = require("../../BattleUi/Views/KeyItem/CombineKeyItem"),
	HudUnitBase_1 = require("../HudUnitBase"),
	CLOSE_ANIM_TIME = 300,
	RAD_2_DEG = 180 / Math.PI;
class ManipulateCursorUnit extends HudUnitBase_1.HudUnitBase {
	constructor() {
		super(...arguments),
			(this.zei = new UE.Rotator()),
			(this.Cct = void 0),
			(this.Zei = void 0),
			(this.eti = void 0),
			(this.xet = void 0),
			(this.J_t = void 0),
			(this.tti = void 0),
			(this.znt = void 0),
			(this.$ei = void 0),
			(this.dce = !1),
			(this.iti = 0),
			(this.oti = 0),
			(this.rti = !1),
			(this.nti = () => {
				(this.znt = TimerSystem_1.TimerSystem.Delay(this.ist, 300)),
					this.J_t?.SetUIActive(!1),
					this.PlayTweenAnim(12);
			}),
			(this.ist = () => {
				(this.znt = void 0), this.$ei?.();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UISprite],
			[5, UE.UIItem],
			[6, UE.UINiagara],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIItem],
		]),
			ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
				this.ComponentRegisterInfos.push([13, UE.UIItem]);
	}
	OnStart() {}
	async OnBeforeStartAsync() {
		var t;
		(this.eti = this.GetItem(2)),
			(this.J_t = this.GetItem(3)),
			(this.tti = this.GetSprite(4)),
			ModelManager_1.ModelManager.PlatformModel.IsMobile()
				? ((this.Cct = this.GetSprite(0)),
					(this.Zei = this.GetSprite(1)),
					this.Cct.SetUIActive(!0),
					this.Zei.SetUIActive(!1))
				: (t = this.GetItem(13)) &&
					((this.xet = new CombineKeyItem_1.CombineKeyItem()),
					await this.xet.CreateByActorAsync(t.GetOwner()),
					this.RefreshKeyVisible(),
					this.SetKeyAction(InputMappingsDefine_1.actionMappings.幻象1)),
			this.Brt(),
			this.Appear(),
			0 < this.iti && this.J_t?.SetUIActive(!0);
	}
	OnBeforeDestroy() {
		this.Jei(),
			(this.Cct = void 0),
			(this.Zei = void 0),
			(this.eti = void 0),
			(this.xet = void 0),
			(this.J_t = void 0),
			(this.tti = void 0),
			(this.$ei = void 0),
			super.OnBeforeDestroy();
	}
	Refresh(t, i, e) {
		this.sti(),
			(this.zei.Yaw = Math.atan2(i.Y, i.X) * RAD_2_DEG - 90),
			(this.zei.Roll = 0),
			(this.zei.Pitch = 0),
			(t = !t),
			this.eti.IsUIActiveInHierarchy() !== t && this.eti.SetUIActive(t),
			t && this.eti.SetUIRelativeRotation(this.zei),
			this.SetAnchorOffset(i.X, i.Y),
			this.ati(e);
	}
	ati(t) {
		this.rti !== t &&
			((this.rti = t),
			2 === ModelManager_1.ModelManager.PlatformModel.OperationType
				? t
					? this.SetKeyAction(InputMappingsDefine_1.actionMappings.攻击)
					: this.SetKeyAction(InputMappingsDefine_1.actionMappings.幻象1)
				: (this.Cct.SetUIActive(!t), this.Zei.SetUIActive(t)));
	}
	SetKeyAction(t) {
		this.xet?.RefreshAction(t);
	}
	RefreshKeyVisible() {
		this.xet &&
			(2 !== ModelManager_1.ModelManager.PlatformModel.OperationType
				? this.xet.SetActive(!1)
				: this.xet.SetActive(!0));
	}
	StartProcess(t) {
		this.J_t?.SetUIActive(!0),
			this.hti(0),
			(this.iti = 0 < t ? 1 / (t * TimeUtil_1.TimeUtil.InverseMillisecond) : 0),
			(this.oti = Time_1.Time.WorldTime);
	}
	EndProcess(t) {
		this.StopProcessAnim(), (this.iti = 0), t && this.hti(0);
	}
	sti() {
		var t;
		this.iti <= 0 ||
			((t = Time_1.Time.WorldTime),
			(t = Math.min((t - this.oti) * this.iti, 1)),
			this.hti(t));
	}
	hti(t) {
		this.tti?.SetFillAmount(t);
	}
	PlayActivateEffect() {
		var t = this.GetUiNiagara(6);
		t.SetUIActive(!0), t.ActivateSystem(!0);
	}
	Brt() {
		this.InitTweenAnim(7),
			this.InitTweenAnim(8),
			this.InitTweenAnim(9),
			this.InitTweenAnim(10),
			this.InitTweenAnim(12);
	}
	Appear() {
		(this.dce = !0),
			this.Jei(),
			this.InAsyncLoading() ||
				(this.Cct?.SetAlpha(1), this.Zei?.SetAlpha(1), this.eti?.SetAlpha(1));
	}
	PlayStartAnim() {
		this.dce && this.PlayTweenAnim(7);
	}
	PlayCompleteAnim() {
		this.dce && this.PlayTweenAnim(9);
	}
	PlayInterruptedAnim() {
		this.dce && this.PlayTweenAnim(10);
	}
	PlayProcessAnim() {
		this.dce && this.PlayTweenAnim(8);
	}
	StopProcessAnim() {
		this.dce && this.StopTweenAnim(8);
	}
	PlayCloseAnim(t) {
		this.dce &&
			((this.dce = !1),
			this.Jei(),
			this.InAsyncLoading()
				? this.$ei?.()
				: t > TimerSystem_1.MIN_TIME
					? (this.znt = TimerSystem_1.TimerSystem.Delay(this.nti, t))
					: this.ist());
	}
	StopCloseAnim() {
		this.Jei(), this.J_t?.SetUIActive(!1), this.StopTweenAnim(12);
	}
	Jei() {
		this.znt &&
			(TimerSystem_1.TimerSystem.Remove(this.znt), (this.znt = void 0));
	}
	SetCloseAnimCallback(t) {
		this.$ei = t;
	}
}
exports.ManipulateCursorUnit = ManipulateCursorUnit;
