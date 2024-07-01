"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CalabashUpgradeSuccessView = void 0);
const UE = require("ue"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class CalabashUpgradeSuccessView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.wvt = !1),
			(this.Bvt = !1),
			(this.bvt = !1),
			(this.qvt = 0),
			(this.Gvt = 0),
			(this.Nvt = 0),
			(this.Ovt = 0),
			(this.kvt = 0),
			(this.Fvt = void 0),
			(this.Vvt =
				CommonParamById_1.configCommonParamById.GetIntConfig("ExpDisplayTime")),
			(this.Hvt = CommonParamById_1.configCommonParamById.GetIntConfig(
				"ExpDisplayCloseTime",
			)),
			(this.jvt = (t) => {
				(this.qvt += this.kvt * t),
					this.qvt >= this.Nvt &&
						((this.qvt = this.Nvt),
						TimerSystem_1.TimerSystem.Remove(this.Fvt),
						this.wvt
							? (this.GetItem(6).SetUIActive(!0),
								this.GetItem(5).SetUIActive(!1),
								this.UiViewSequence?.PlaySequence("LevelUp"))
							: this.CloseMe()),
					this.Wvt();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UISprite],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
		];
	}
	OnStart() {
		var t,
			e = this.OpenParam;
		(this.wvt = e.CurLevel > e.PreLevel),
			(this.Bvt = e.AddExp),
			(this.bvt = !1),
			this.GetItem(6).SetUIActive(!this.Bvt),
			this.GetItem(5).SetUIActive(this.Bvt),
			this.wvt &&
				(this.GetText(3).SetText(e.CurLevel.toString()),
				(t =
					ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
						e.CurLevel,
					)) && !StringUtils_1.StringUtils.IsEmpty(t.LevelUpDescription)
					? (this.GetItem(7).SetUIActive(!0),
						LguiUtil_1.LguiUtil.SetLocalTextNew(
							this.GetText(4),
							t.LevelUpDescription,
						))
					: this.GetItem(7).SetUIActive(!1)),
			this.Bvt &&
				(this.GetText(0).SetText(e.PreLevel.toString()),
				(this.qvt = e.PreExp),
				(this.Gvt = ModelManager_1.ModelManager.CalabashModel.GetMaxExpByLevel(
					e.PreLevel,
				)),
				(this.Ovt = ModelManager_1.ModelManager.CalabashModel.GetMaxExpByLevel(
					e.CurLevel,
				)),
				(this.Nvt = this.wvt ? e.CurExp + this.Gvt : e.CurExp),
				(this.kvt = (this.Nvt - this.qvt) / this.Vvt),
				this.Wvt()),
			this.UiViewSequence.AddSequenceFinishEvent("LevelUp", () => {
				this.CloseMe();
			});
	}
	get Kvt() {
		return this.wvt && this.qvt >= this.Gvt;
	}
	Wvt() {
		var t = this.Kvt ? this.qvt - this.Gvt : this.qvt,
			e = this.Kvt ? this.Ovt : this.Gvt;
		this.GetText(1).SetText(Math.round(t) + "/" + e),
			this.GetSprite(2).SetFillAmount(t / e),
			this.Fvt &&
				e < t &&
				!this.bvt &&
				((this.bvt = !0), this.UiViewSequence.PlaySequence("Stuck"));
	}
	OnAfterShow() {
		this.Bvt
			? (this.Fvt = TimerSystem_1.TimerSystem.Forever(
					this.jvt,
					TimerSystem_1.MIN_TIME,
				))
			: (this.Fvt = TimerSystem_1.TimerSystem.Delay(() => {
					this.CloseMe();
				}, this.Hvt));
	}
	OnBeforeDestroy() {
		this.Fvt &&
			TimerSystem_1.TimerSystem.Has(this.Fvt) &&
			TimerSystem_1.TimerSystem.Remove(this.Fvt);
	}
}
exports.CalabashUpgradeSuccessView = CalabashUpgradeSuccessView;
