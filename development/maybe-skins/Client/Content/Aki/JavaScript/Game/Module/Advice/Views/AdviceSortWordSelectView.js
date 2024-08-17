"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdviceSortWordSelectView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
	AdviceWordItem_1 = require("./AdviceWordItem"),
	AdviceWordTypeItem_1 = require("./AdviceWordTypeItem"),
	WAITUPDATECOUNT = 1;
class AdviceSortWordSelectView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Y7e = void 0),
			(this.R7e = void 0),
			(this.U7e = !1),
			(this.A7e = 0),
			(this.J7e = !1),
			(this.x7e = 0),
			(this.w7e = (e, t, i) => (
				(t = new AdviceWordTypeItem_1.AdviceWordTypeItem(t)).UpdateItem(e),
				{ Key: i, Value: t }
			)),
			(this.B7e = (e, t, i) => (
				(t = new AdviceWordItem_1.AdviceWordItem(t)).UpdateItem(e),
				{ Key: i, Value: t }
			)),
			(this._Fe = () => {
				var e = ModelManager_1.ModelManager.AdviceModel;
				e.CurrentWordMap.set(e.CurrentSelectWordIndex, e.PreSelectSortWordId),
					this.CloseMe(),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnSelectAdviceWord,
					);
			}),
			(this.J9e = () => {
				this.CloseMe();
			}),
			(this.b7e = () => {
				var e =
					ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordTypeConfigs();
				const t = new Array();
				e.forEach((e) => {
					t.push(e.Id);
				}),
					this.Y7e.RefreshByData(t),
					this.q7e(),
					(this.x7e = 0),
					this.Y7e.UnBindLateUpdate(),
					(this.J7e = !0),
					this.Y7e.BindLateUpdate(this.z7e);
			}),
			(this.z7e = (e) => {
				var t;
				this.J7e &&
					this.x7e >= 1 &&
					((this.J7e = !1),
					(t = this.N7e()),
					this.GetScrollViewWithScrollbar(0).SetScrollProgress(t),
					this.Y7e.UnBindLateUpdate()),
					this.x7e++;
			}),
			(this.q7e = () => {
				var e = ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId;
				e =
					ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordConfigsByType(
						e,
					);
				const t = new Array();
				e.forEach((e) => {
					t.push(e.Id);
				}),
					this.R7e.RefreshByData(t),
					(this.A7e = 0),
					this.R7e.UnBindLateUpdate(),
					(this.U7e = !0),
					this.R7e.BindLateUpdate(this.O7e);
			}),
			(this.O7e = (e) => {
				var t;
				this.U7e &&
					this.A7e >= 1 &&
					((this.U7e = !1),
					(t = this.k7e()),
					this.GetScrollViewWithScrollbar(2).SetScrollProgress(t)),
					this.A7e >= 2 &&
						((t = this.k7e()),
						this.GetScrollScrollbar(6).SetValue(t),
						this.R7e.UnBindLateUpdate()),
					this.A7e++;
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIScrollViewWithScrollbarComponent],
			[1, UE.UIItem],
			[2, UE.UIScrollViewWithScrollbarComponent],
			[3, UE.UIItem],
			[5, UE.UIButtonComponent],
			[4, UE.UIButtonComponent],
			[6, UE.UIScrollbarComponent],
			[7, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[4, this.J9e],
				[5, this._Fe],
			]);
	}
	OnStart() {
		(this.Y7e = new GenericScrollView_1.GenericScrollView(
			this.GetScrollViewWithScrollbar(0),
			this.w7e,
		)),
			(this.R7e = new GenericScrollView_1.GenericScrollView(
				this.GetScrollViewWithScrollbar(2),
				this.B7e,
			));
		var e,
			t = this.R7e.TempOriginalItem;
		t &&
			(e = (t = t.GetOwner()).GetComponentByClass(
				UE.UIButtonComponent.StaticClass(),
			)) &&
			t.K2_DestroyComponent(e),
			(ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId =
				ModelManager_1.ModelManager.AdviceModel.CurrentSelectSortTypeId),
			(ModelManager_1.ModelManager.AdviceModel.PreSelectSortWordId =
				ModelManager_1.ModelManager.AdviceModel.CurrentSelectSortWordId),
			this.b7e(),
			this.mGe();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnClickAdviceSort,
			this.q7e,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnClickAdviceSort,
			this.q7e,
		);
	}
	mGe() {
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(7), "AdviceSelectWord");
	}
	N7e() {
		var e =
			ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordTypeConfigs();
		let t = 0;
		for (let i = 0; i < e.length; i++)
			if (
				e[i].Id === ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId
			) {
				t = i;
				break;
			}
		return t / (e.length - 1);
	}
	k7e() {
		var e = ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId,
			t =
				ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordConfigsByType(
					e,
				);
		let i = 0;
		for (let e = 0; e < t.length; e++)
			if (
				t[e].Id === ModelManager_1.ModelManager.AdviceModel.PreSelectSortWordId
			) {
				i = e;
				break;
			}
		return i / (t.length - 1);
	}
	OnBeforeDestroy() {
		this.Y7e && (this.Y7e.ClearChildren(), (this.Y7e = void 0)),
			this.R7e && (this.R7e.ClearChildren(), (this.R7e = void 0));
	}
}
exports.AdviceSortWordSelectView = AdviceSortWordSelectView;
