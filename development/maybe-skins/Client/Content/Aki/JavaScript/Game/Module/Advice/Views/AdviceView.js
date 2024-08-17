"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdviceView = void 0);
const UE = require("ue"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
	AdviceItem_1 = require("./AdviceItem"),
	WAITUPDATECOUNT = 1;
class AdviceView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.xqe = void 0),
			(this.Z7e = void 0),
			(this.eHe = !1),
			(this.tHe = 0),
			(this.iHe = () => {
				this.oHe(), this.rHe(), this.Qbe();
			}),
			(this.sGe = (e, t, i) => (
				(t = new AdviceItem_1.AdviceItem(t)).Update(e), { Key: i, Value: t }
			)),
			(this.nHe = (e) => {
				var t;
				this.eHe &&
					this.tHe >= 1 &&
					((this.eHe = !1),
					(t = this.sHe(this.Z7e)),
					this.GetScrollViewWithScrollbar(1).SetScrollProgress(t),
					this.xqe.UnBindLateUpdate()),
					this.tHe++;
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIScrollViewWithScrollbarComponent],
			[2, UE.UIItem],
			[3, UE.UIText],
		];
	}
	OnStart() {
		this.xqe = new GenericScrollView_1.GenericScrollView(
			this.GetScrollViewWithScrollbar(1),
			this.sGe,
		);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnDeleteAdviceSuccess,
			this.iHe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnCreateAdviceSuccess,
				this.iHe,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnDeleteAdviceSuccess,
			this.iHe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnCreateAdviceSuccess,
				this.iHe,
			);
	}
	OnAfterShow() {
		this.oHe(), this.rHe(), this.Qbe();
	}
	oHe() {
		this.Z7e = new Array();
		var e = ModelManager_1.ModelManager.AdviceModel.GetAdviceArray();
		for (let t = e.length - 1; 0 <= t; t--) this.Z7e.push(e[t]);
		this.xqe.RefreshByData(this.Z7e),
			this.xqe.UnBindLateUpdate(),
			(this.eHe = !0),
			(this.tHe = 0),
			this.xqe.BindLateUpdate(this.nHe);
	}
	Qbe() {
		var e = ModelManager_1.ModelManager.AdviceModel.GetAdviceArray(),
			t =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"AdviceCreateLimit",
				) ?? 0;
		LguiUtil_1.LguiUtil.SetLocalText(
			this.GetText(3),
			"ReputationNormalValue",
			e.length,
			t,
		);
	}
	sHe(e) {
		let t = 0;
		for (let i = 0; i < e.length; i++)
			if (
				ModelManager_1.ModelManager.AdviceModel.AdviceViewShowId ===
				e[i].GetAdviceBigId()
			) {
				t = i;
				break;
			}
		return t / (e.length - 1);
	}
	rHe() {
		var e =
			0 === ModelManager_1.ModelManager.AdviceModel.GetAdviceArray().length;
		this.GetItem(2).SetUIActive(e),
			this.GetScrollViewWithScrollbar(1).GetRootComponent().SetUIActive(!e);
	}
	OnBeforeDestroy() {
		this.xqe.ClearChildren();
	}
}
exports.AdviceView = AdviceView;
