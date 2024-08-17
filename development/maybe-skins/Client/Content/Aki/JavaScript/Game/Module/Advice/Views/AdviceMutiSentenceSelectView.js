"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdviceMutiSentenceSelectView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
	AdviceSentenceSelectItem_1 = require("./AdviceSentenceSelectItem"),
	AdviceSentenceSelectItemContent_1 = require("./AdviceSentenceSelectItemContent"),
	WAITUPDATECOUNT = 1;
class AdviceMutiSentenceSelectView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.D7e = void 0),
			(this.R7e = void 0),
			(this.U7e = !1),
			(this.A7e = 0),
			(this.P7e = !1),
			(this.x7e = 0),
			(this.w7e = (e, t, n) => (
				(t = new AdviceSentenceSelectItem_1.AdviceSentenceSelectItem(
					t,
				)).UpdateItem(e),
				{ Key: n, Value: t }
			)),
			(this.B7e = (e, t, n) => (
				(t =
					new AdviceSentenceSelectItemContent_1.AdviceSentenceSelectItemContent(
						t,
					)).UpdateItem(e),
				{ Key: n, Value: t }
			)),
			(this._Fe = () => {
				ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.forEach(
					(e, t) => {
						ModelManager_1.ModelManager.AdviceModel.CurrentSentenceWordMap.get(
							t,
						) !== e &&
							ModelManager_1.ModelManager.AdviceModel.OnChangeSentence(t);
					},
				),
					ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.forEach(
						(e, t) => {
							ModelManager_1.ModelManager.AdviceModel.CurrentSentenceWordMap.set(
								t,
								e,
							);
						},
					),
					this.CloseMe(),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnChangeAdviceWord,
					);
			}),
			(this.J9e = () => {
				this.CloseMe();
			}),
			(this.b7e = () => {
				var e = new Array();
				e.push(0),
					e.push(1),
					this.D7e.RefreshByData(e),
					this.q7e(),
					(this.x7e = 0),
					this.D7e.UnBindLateUpdate(),
					(this.P7e = !0),
					this.D7e.BindLateUpdate(this.G7e);
			}),
			(this.G7e = (e) => {
				var t;
				this.P7e &&
					this.x7e >= 1 &&
					((this.P7e = !1),
					(t = this.N7e()),
					this.GetScrollViewWithScrollbar(0).SetScrollProgress(t),
					this.D7e.UnBindLateUpdate()),
					this.x7e++;
			}),
			(this.q7e = () => {
				const e = new Array();
				ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceConfigs().forEach(
					(t) => {
						e.push(t.Id);
					},
				),
					this.R7e.RefreshByData(e),
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
		(this.D7e = new GenericScrollView_1.GenericScrollView(
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
			(ModelManager_1.ModelManager.AdviceModel.CurrentSentenceSelectIndex = 0),
			ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.clear(),
			ModelManager_1.ModelManager.AdviceModel.CurrentSentenceWordMap.forEach(
				(e, t) => {
					ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.set(
						t,
						e,
					);
				},
			),
			this.b7e(),
			this.mGe();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnClickAdviceSort,
			this.b7e,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnClickAdviceSort,
			this.b7e,
		);
	}
	mGe() {
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(7), "AdvicePutSentence");
	}
	N7e() {
		var e =
			ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordTypeConfigs();
		let t = 0;
		for (let n = 0; n < e.length; n++)
			if (
				e[n].Id === ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId
			) {
				t = n;
				break;
			}
		return t / (e.length - 1);
	}
	k7e() {
		var e =
				ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.get(
					ModelManager_1.ModelManager.AdviceModel.CurrentSentenceSelectIndex,
				),
			t = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceConfigs();
		let n = 0;
		for (let i = 0; i < t.length; i++)
			if (t[i].Id === e) {
				n = i;
				break;
			}
		return n / (t.length - 1);
	}
	OnBeforeDestroy() {
		this.D7e && (this.D7e.ClearChildren(), (this.D7e = void 0)),
			this.R7e && (this.R7e.ClearChildren(), (this.R7e = void 0));
	}
}
exports.AdviceMutiSentenceSelectView = AdviceMutiSentenceSelectView;
