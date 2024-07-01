"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceItem =
		exports.InstanceSeriesItem =
		exports.InstanceDetectItem =
			void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
	ActivityMowingController_1 = require("../Activity/ActivityContent/Mowing/ActivityMowingController"),
	LguiUtil_1 = require("../Util/LguiUtil");
class InstanceDetectItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Data = void 0),
			(this.qsi = void 0),
			(this.Gsi = void 0),
			(this.Nsi = void 0),
			(this.Osi = void 0),
			(this.ksi = void 0),
			(this.Fsi = void 0),
			(this.Vsi = void 0);
	}
	async Init(e) {
		await super.CreateByActorAsync(e.GetOwner(), void 0, !0), await this.Wzt();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
		];
	}
	async Wzt() {
		(this.qsi = new InstanceSeriesItem()),
			(this.Gsi = new InstanceItem()),
			(this.Nsi = new InstanceSeriesItem()),
			(this.Osi = new InstanceItem()),
			this.AddChild(this.Gsi),
			this.AddChild(this.qsi),
			this.AddChild(this.Nsi),
			this.AddChild(this.Osi),
			await Promise.all([
				this.qsi.CreateByActorAsync(this.GetItem(0).GetOwner()),
				this.Gsi.CreateByActorAsync(this.GetItem(1).GetOwner()).finally(),
				this.Nsi.CreateByActorAsync(this.GetItem(2).GetOwner()),
				this.Osi.CreateByActorAsync(this.GetItem(3).GetOwner()).finally(),
			]);
	}
	GetUsingItem(e) {
		var t =
			ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
				e.InstanceGirdId,
			);
		if (e.InstanceSeriesTitle) {
			return (t ? this.GetItem(0) : this.GetItem(2)).GetOwner();
		}
		return (t ? this.GetItem(1) : this.GetItem(3)).GetOwner();
	}
	Update(e, t) {
		this.Data = e;
		var i =
			!ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
				e.InstanceGirdId,
			);
		let s = this.qsi,
			n = this.Gsi;
		this.qsi.SetUiActive(!i),
			this.Gsi.SetUiActive(!i),
			this.Nsi.SetUiActive(i),
			this.Osi.SetUiActive(i),
			i && ((n = this.Osi), (s = this.Nsi)),
			e.InstanceSeriesTitle
				? (n.SetUiActive(!1),
					s.SetUiActive(!0),
					(s.CurrentData = e).IsOnlyOneGrid
						? (s.BindClickCallbackOnlyOneGrid(this.Fsi),
							s.Update(e.InstanceGirdId, e.IsSelect, !0))
						: (s.BindClickCallback(this.ksi),
							s.Update(e.InstanceSeriesTitle, e.IsSelect)))
				: (s.SetUiActive(!1),
					n.SetUiActive(!0),
					n.BindClickCallback(this.Fsi),
					n.BindCanExecuteChange(this.Vsi),
					n.Update(e.InstanceGirdId, e.IsSelect, e.IsShow));
	}
	GetActiveNameText() {
		return (
			this.qsi.IsUiActiveInHierarchy()
				? this.qsi
				: this.Gsi.IsUiActiveInHierarchy()
					? this.Gsi
					: this.Nsi.IsUiActiveInHierarchy()
						? this.Nsi
						: this.Osi
		).GetTitleText();
	}
	BindClickSeriesCallback(e) {
		this.ksi = e;
	}
	BindClickInstanceCallback(e) {
		this.Fsi = e;
	}
	BindCanExecuteChange(e) {
		this.Vsi = e;
	}
	ClearItem() {
		this.Destroy();
	}
	GetExtendToggleForGuide() {
		if (this.Gsi.GetActive()) return this.Gsi.ExtendToggle;
		Log_1.Log.CheckWarn() &&
			Log_1.Log.Warn(
				"Guide",
				17,
				"聚焦引导索引到了副本标题, 检查extraParam字段是否配置错误",
			);
	}
}
exports.InstanceDetectItem = InstanceDetectItem;
class InstanceSeriesItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(),
			(this.b5e = void 0),
			(this.Zqe = void 0),
			(this.Hsi = void 0),
			(this.TDe = void 0),
			(this.jsi = 0),
			(this.Wsi = !1),
			(this.Ksi = !1),
			(this.Qsi = void 0),
			(this.Xsi = !1),
			(this.CurrentData = void 0),
			(this.$si = () => {
				var e =
					ActivityMowingController_1.ActivityMowingController.GetMowingActivityData();
				e &&
					((e = e.GetActivityLevelCountdownText(this.jsi)),
					this.GetText(8).SetText(e),
					StringUtils_1.StringUtils.IsEmpty(e)) &&
					((this.Xsi = !1), this.Update(this.jsi, this.Wsi, this.Ksi));
			}),
			(this.OnClickExtendToggle = (e) => {
				1 === e &&
					((this.Wsi = !0),
					this.Zqe && this.Zqe(this.jsi, this.b5e, this.Wsi),
					this.Hsi) &&
					this.Hsi(this.jsi, this.b5e, this.CurrentData);
			}),
			(this.Ysi = (e) => {
				(e = 1 === e), (this.Wsi = e), this.GetItem(5)?.SetUIActive(e);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIItem],
			[2, UE.UITexture],
			[3, UE.UIText],
			[5, UE.UIItem],
			[7, UE.UIItem],
			[6, UE.UIItem],
			[4, UE.UIItem],
			[8, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.OnClickExtendToggle]]);
	}
	OnStart() {
		(this.b5e = this.GetExtendToggle(0)),
			this.b5e.SetToggleState(0),
			this.b5e.OnStateChange.Add(this.Ysi),
			(this.TDe = TimerSystem_1.TimerSystem.Forever(() => {
				this.E9e();
			}, TimeUtil_1.TimeUtil.InverseMillisecond));
	}
	OnBeforeDestroy() {
		void 0 !== this.TDe &&
			(TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
	}
	E9e() {
		this.Xsi && this.Qsi?.();
	}
	GetTitleText() {
		return this.GetText(3);
	}
	Update(e, t, i = !1) {
		if (
			((this.jsi = e),
			(this.Wsi = t),
			(this.Ksi = i),
			this.b5e.SetToggleStateForce(t ? 1 : 0),
			this.GetItem(5)?.SetUIActive(t),
			this.GetSprite(2)?.SetUIActive(!1),
			this.GetItem(1)?.SetUIActive(!1),
			i)
		) {
			(e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
				this.jsi,
			)),
				(t =
					(LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.MapName),
					t && this.Hsi && this.Hsi(this.jsi, this.b5e, this.CurrentData),
					e.DifficultyIcon)),
				(t =
					(this.GetSprite(2)?.SetUIActive(!0),
					this.GetItem(1)?.SetUIActive(!0),
					this.SetTextureByPath(t, this.GetTexture(2)),
					this.GetText(8)?.SetUIActive(!0),
					e.SubTitle));
			if (0 < t?.size) {
				let e, i;
				for (var [s, n] of t) (e = s), (i = n);
				1 === e
					? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), i)
					: 2 === e &&
						((t =
							ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
								this.jsi,
								ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
							)),
						LguiUtil_1.LguiUtil.SetLocalTextNew(
							this.GetText(8),
							"RecommendLevel",
							t,
						));
			} else
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(8),
					e.SubInstanceTitle,
				);
		} else
			(t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTitleConfig(
				this.jsi,
			)),
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.CommonText),
				this.GetText(8)?.SetUIActive(!1),
				(e = t.IconTexture) &&
					(this.GetSprite(2)?.SetUIActive(!0),
					this.GetItem(1)?.SetUIActive(!0),
					this.SetTextureByPath(e, this.GetTexture(2)));
		(this.Xsi = this.Jsi(this.jsi)), this.Xsi && this.Qsi?.(), this.zsi(i);
	}
	Jsi(e) {
		if (
			ActivityMowingController_1.ActivityMowingController.IsMowingInstanceDungeon(
				e,
			)
		) {
			var t =
				ActivityMowingController_1.ActivityMowingController.GetMowingActivityData();
			if (!t) return !1;
			this.Qsi = this.$si;
			var i = t.GetActivityLevelUnlockState(e);
			return (
				i &&
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(8),
						"ActivityMowing_Point",
						t.GetLevelMaxPoint(e),
					),
				!i
			);
		}
		return !1;
	}
	BindClickCallback(e) {
		this.Zqe = e;
	}
	BindClickCallbackOnlyOneGrid(e) {
		this.Hsi = e;
	}
	zsi(e) {
		var t =
			!ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
				this.jsi,
			);
		this.GetItem(4).SetUIActive(!e),
			e &&
				(t
					? (this.GetItem(7).SetUIActive(!0), this.GetItem(6).SetUIActive(!1))
					: ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(
								this.jsi,
							)
						? (this.GetItem(7).SetUIActive(!1), this.GetItem(6).SetUIActive(!0))
						: (this.GetItem(7).SetUIActive(!1),
							this.GetItem(6).SetUIActive(!1)));
	}
}
exports.InstanceSeriesItem = InstanceSeriesItem;
class InstanceItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(),
			(this.ExtendToggle = void 0),
			(this.Zqe = void 0),
			(this.Vsi = void 0),
			(this.NUe = 0),
			(this.T7e = () => !this.Vsi || this.Vsi(this.NUe)),
			(this.OnClickExtendToggle = (e) => {
				1 === e && this.Zqe && this.Zqe(this.NUe, this.ExtendToggle, void 0);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[2, UE.UIText],
			[1, UE.UITexture],
			[3, UE.UIItem],
			[4, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.OnClickExtendToggle]]);
	}
	OnStart() {
		(this.ExtendToggle = this.GetExtendToggle(0)),
			this.ExtendToggle.SetToggleState(0);
	}
	GetTitleText() {
		return this.GetText(2);
	}
	Update(e, t, i) {
		(this.NUe = e),
			this.ExtendToggle.SetToggleStateForce(t ? 1 : 0),
			this.ExtendToggle.CanExecuteChange.Unbind(),
			this.ExtendToggle.CanExecuteChange.Bind(this.T7e),
			t && this.Zqe && this.Zqe(this.NUe, this.ExtendToggle, void 0),
			i && (this.zsi(), this.Zsi(), this.eai());
	}
	zsi() {
		ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
			this.NUe,
		)
			? ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(
					this.NUe,
				)
				? (this.GetItem(3).SetUIActive(!1), this.GetItem(4).SetUIActive(!0))
				: (this.GetItem(3).SetUIActive(!1), this.GetItem(4).SetUIActive(!1))
			: (this.GetItem(3).SetUIActive(!0), this.GetItem(4).SetUIActive(!1));
	}
	Zsi() {
		var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
				this.NUe,
			),
			t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
				this.NUe,
				ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
			);
		e = e.SubTitle;
		if (0 < e?.size) {
			let n, a;
			for (var [i, s] of e) (n = i), (a = s);
			1 === n
				? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), a)
				: 2 === n &&
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(2),
						"RecommendLevel",
						t,
					);
		} else
			LguiUtil_1.LguiUtil.SetLocalText(
				this.GetText(2),
				"InstanceDungeonRecommendLevel",
				t,
			);
	}
	eai() {
		var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
			this.NUe,
		).DifficultyIcon;
		e && this.SetTextureByPath(e, this.GetTexture(1));
	}
	BindClickCallback(e) {
		this.Zqe = e;
	}
	BindCanExecuteChange(e) {
		this.Vsi = e;
	}
}
exports.InstanceItem = InstanceItem;
