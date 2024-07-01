"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MarqueeView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	MarqueeController_1 = require("../MarqueeController"),
	TARGETPOSITIONOFFSET = 10;
class MarqueeView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.tAi = 0),
			(this.iAi = void 0),
			(this.oAi = void 0),
			(this.UBt = void 0),
			(this.rAi = 0),
			(this.nAi = void 0),
			(this.unt = 0),
			(this.sAi = void 0),
			(this.aAi = !0),
			(this.hAi = () => {
				ModelManager_1.ModelManager.MarqueeModel.CurMarquee &&
					(ModelManager_1.ModelManager.MarqueeModel.CurMarquee.RefreshContent(),
					this.hke(ModelManager_1.ModelManager.MarqueeModel.CurMarquee));
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UISprite],
		];
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.TextLanguageChange,
			this.hAi,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.TextLanguageChange,
			this.hAi,
		);
	}
	OnStart() {
		var e = ModelManager_1.ModelManager.MarqueeModel.PeekMarqueeData();
		e &&
			((ModelManager_1.ModelManager.MarqueeModel.CurMarquee = e),
			(this.oAi = this.GetItem(1)),
			(this.iAi = this.GetText(0)),
			this.hke(e),
			(this.UBt = this.GetSprite(2)),
			(this.tAi = this.oAi.GetWidth() / 2 + this.UBt.GetWidth()),
			(this.rAi = this.tAi),
			this.iAi.SetAnchorOffsetX(this.rAi),
			(this.unt =
				CommonParamById_1.configCommonParamById.GetIntConfig("marquee_speed")));
	}
	OnTick() {
		var e = ModelManager_1.ModelManager.MarqueeModel.CurMarquee;
		if (e && MarqueeController_1.MarqueeController.CheckCurMarqueeValid(e)) {
			e.Content !== this.sAi?.Content && this.hke(e);
			var t = TimeUtil_1.TimeUtil.GetServerTime(),
				i = ModelManager_1.ModelManager.MarqueeModel.GetNextMarquee();
			if (i && i.BeginTime <= t)
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Marquee", 9, "下一条跑马灯到播放时间"),
					MarqueeController_1.MarqueeController.CloseMarqueeView();
			else {
				if (
					this.rAi <
					this.tAi -
						this.oAi.GetWidth() -
						(this.iAi.GetWidth() + this.UBt.GetWidth()) -
						10
				) {
					if ((this.nAi || (this.nAi = t), !(t > this.nAi + e.ScrollInterval)))
						return void (
							this.aAi && (this.RootItem?.SetUIActive(!1), (this.aAi = !1))
						);
					(this.rAi = this.tAi),
						this.iAi.SetAnchorOffsetX(this.rAi),
						ModelManager_1.ModelManager.MarqueeModel.UpdateMarqueeStorageDataByDate(
							e,
						),
						(this.nAi = void 0),
						this.aAi || (this.RootItem?.SetUIActive(!0), (this.aAi = !0));
				}
				(this.rAi -= this.unt), this.iAi.SetAnchorOffsetX(this.rAi);
			}
		} else MarqueeController_1.MarqueeController.CloseMarqueeView();
	}
	hke(e) {
		let t = (this.sAi = e).Content.replace(/\r\n/g, " ");
		if (t.includes("{EndTime}")) {
			(e = ModelManager_1.ModelManager.MarqueeModel.GetMarqueeDataLeftTime(e)),
				(e = Math.ceil(e / 60));
			var i =
				ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
					"ShopMinuteText",
				);
			let r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i);
			(r = r.replace("{0}", e.toString())), (t = t.replace("{EndTime}", r));
		}
		this.iAi.SetText(t);
	}
}
exports.MarqueeView = MarqueeView;
