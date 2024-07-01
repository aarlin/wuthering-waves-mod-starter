"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InfluenceReputationView = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
	InfluenceReputationDefine_1 = require("../InfluenceReputationDefine"),
	InfluenceDisplayItem_1 = require("./Item/InfluenceDisplayItem"),
	DEVIATION_VALUE = 10,
	PROGRESS_DEVIATION_VALUE = 0.05;
class InfluenceReputationView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.xqe = void 0),
			(this.tni = 0),
			(this.oTt = 0),
			(this.ini = 0),
			(this.oni = !1),
			(this.rni = !1),
			(this.nni = !1),
			(this.sni = void 0),
			(this.ani = void 0),
			(this.hni = []),
			(this.eHe = !1),
			(this.lni = !1),
			(this.gpt = () => {
				this.CloseMe();
			}),
			(this.yUt = () => {
				UiManager_1.UiManager.OpenView("InfluenceSearchView", this.tni);
			}),
			(this._ni = () => {
				UiManager_1.UiManager.OpenView("InfluenceAreaSelectView", this.tni);
			}),
			(this.uni = () => {
				var t = (e = this.xqe.ContentItem).GetWidth(),
					e = Math.abs(e.GetAnchorOffsetX()) + this.xqe.ScrollWidth,
					i = this.hni.length;
				if (t < e) this.xqe.ScrollToRight(i - 2);
				else {
					let n = 0;
					(n =
						e % (t /= i) < 10
							? Math.floor(e / t) - 1 - 1
							: Math.floor(e / t) - 1),
						this.xqe.ScrollToRight(n);
				}
			}),
			(this.cni = () => {
				var t, e;
				let i = 0;
				(i =
					(e =
						(e = (t = this.xqe.ContentItem).GetWidth()) /
						((t = Math.abs(t.GetAnchorOffsetX())) < 0 &&
							this.xqe.ScrollToLeft(1),
						this.hni.length)) -
						(t % e) <
					10
						? Math.floor(t / e) + 1 + 1
						: Math.floor(t / e) + 1),
					this.xqe.ScrollToLeft(i);
			}),
			(this.mni = () => {
				this.dni(!1),
					void 0 !== this.oTt &&
						(this.xqe.GetScrollItemByKey(this.oTt).SetDisActiveToggleState(),
						(this.oTt = void 0));
			}),
			(this.sGe = (t, e, i) => (
				(e = new InfluenceDisplayItem_1.InfluenceDisplayItem(e)).UpdateItem(
					t,
					this.tni,
				),
				e.SetToggleFunction(this.pqe),
				e.SetIndex(i),
				{ Key: i, Value: e }
			)),
			(this.pqe = (t, e) => {
				0 === t
					? this.oTt === e && ((this.oTt = void 0), this.Cni(), this.dni(!1))
					: ((t = this.oTt),
						(this.oTt = e),
						void 0 !== t
							? this.xqe.GetScrollItemByKey(t).SetDisActiveToggleState()
							: this.Cni(),
						(this.eHe = !0),
						this.dni(!0));
			}),
			(this.gni = (t) => {
				this.oni &&
					((t = MathUtils_1.MathUtils.Clamp(t.X, 0, 1)), this.ini !== t) &&
					((this.ini = t), this.Cni());
			}),
			(this.PWt = (t) => {
				(this.tni = t), this.Og();
			}),
			(this.fni = (t, e) => {
				(this.tni = e), this.Og(), this.pni(t);
			}),
			(this.nHe = (t) => {
				this.eHe && ((this.eHe = !1), this.vni()),
					this.lni &&
						((this.lni = !1), (this.oni = this.xqe.IsExpand), this.Cni());
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIScrollViewWithScrollbarComponent],
			[2, UE.UIButtonComponent],
			[3, UE.UIButtonComponent],
			[4, UE.UIButtonComponent],
			[5, UE.UIButtonComponent],
			[6, UE.UITexture],
			[7, UE.UIText],
			[8, UE.UIText],
			[9, UE.UIText],
			[10, UE.UIButtonComponent],
			[11, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[0, this.gpt],
				[5, this.yUt],
				[4, this._ni],
				[2, this.uni],
				[3, this.cni],
				[10, this.mni],
			]);
	}
	OnBeforeCreate() {
		this.tni = this.OpenParam;
	}
	OnStart() {
		(this.xqe = new GenericScrollView_1.GenericScrollView(
			this.GetScrollViewWithScrollbar(1),
			this.sGe,
		)),
			this.xqe.BindScrollValueChange(this.gni),
			this.xqe.BindLateUpdate(this.nHe);
		var t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerStand();
		this.SetTextureByPath(t, this.GetTexture(6)),
			(this.sni = this.GetButton(2).RootUIComp),
			(this.ani = this.GetButton(3).RootUIComp),
			this.sni.SetUIActive(!1),
			this.ani.SetUIActive(!1),
			(this.rni = !1),
			(this.nni = !1);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RefreshInfluencePanel,
			this.PWt,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SearchInfluence,
				this.fni,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RefreshInfluencePanel,
			this.PWt,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SearchInfluence,
				this.fni,
			);
	}
	OnAfterShow() {
		this.Og();
	}
	OnBeforeDestroy() {
		this.xqe.ClearChildren(),
			(this.xqe = void 0),
			(this.ani = void 0),
			(this.sni = void 0);
	}
	Og() {
		var t = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(
			this.tni,
		);
		(this.hni = t.Influences.filter(
			(t) => t !== InfluenceReputationDefine_1.RAMDOM_INFLUENCE_ID,
		)),
			this.Mni(),
			this.Sni(t.Title),
			this.Eni(),
			this.yni(),
			this.dni(!1);
	}
	pni(t) {
		(t = this.hni.indexOf(t)),
			this.xqe.GetScrollItemByKey(t).SetToggleState(1, !0);
	}
	Mni() {
		(this.oTt = void 0), this.xqe.RefreshByData(this.hni), (this.lni = !0);
	}
	Sni(t) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), t);
	}
	Eni() {
		let t = 0;
		for (const e of this.xqe.GetScrollItemMap().values()) e.IsUnLock() && t++;
		this.GetText(8).SetText(t.toString()),
			this.GetText(9).SetText(this.hni.length.toString());
	}
	yni() {
		var t =
			ModelManager_1.ModelManager.InfluenceReputationModel.HasRedDotExcludeCurrentCountry(
				this.tni,
			);
		this.GetItem(11).SetUIActive(t);
	}
	Cni() {
		var t;
		this.oni && void 0 === this.oTt
			? void 0 !== this.ini &&
				((t = this.ini < 0.95),
				this.rni !== t && ((this.rni = t), this.sni.SetUIActive(t)),
				(t = this.ini > 0.05),
				this.nni !== t) &&
				((this.nni = t), this.ani.SetUIActive(t))
			: (this.rni && ((this.rni = !1), this.sni.SetUIActive(!1)),
				this.nni && ((this.nni = !1), this.ani.SetUIActive(!1)));
	}
	dni(t) {
		this.GetButton(10).RootUIComp.SetUIActive(t);
	}
	vni() {
		var t = this.xqe.GetScrollItemMap().size;
		this.oTt === t - 1
			? this.xqe.ScrollToLeft(this.oTt - 1)
			: this.xqe.ScrollToLeft(this.oTt);
	}
}
exports.InfluenceReputationView = InfluenceReputationView;
