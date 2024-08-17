"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HandBookQuestView = void 0);
const UE = require("ue"),
	Time_1 = require("../../../Core/Common/Time"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData"),
	CommonTabData_1 = require("../Common/TabComponent/CommonTabData"),
	CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
	TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem"),
	CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	GenericScrollViewNew_1 = require("../Util/ScrollView/GenericScrollViewNew"),
	HandBookController_1 = require("./HandBookController"),
	HandBookQuestItem_1 = require("./HandBookQuestItem");
class HandBookQuestView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.RoleRootUiCameraHandleData = void 0),
			(this.GenericScroll = void 0),
			(this.KVe = void 0),
			(this.mUn = []),
			(this.cpt = void 0),
			(this._Ve = 0),
			(this.upt = void 0),
			(this.cVe = void 0),
			(this.Zzt = void 0),
			(this.Refresh = () => {
				this.RefreshLoopScrollView(), this.RefreshCollectText();
			}),
			(this.dVe = (e, t) => new CommonTabItem_1.CommonTabItem()),
			(this.pqe = (e) => {
				(this.cVe = Time_1.Time.Now),
					(this._Ve = e),
					this.Refresh(),
					this.GetScrollViewWithScrollbar(1)
						.GetContent()
						.GetComponentByClass(UE.UIInturnAnimController.StaticClass())
						.Play();
			}),
			(this.yqe = (e) => (
				(e = this.upt[e]),
				new CommonTabData_1.CommonTabData(
					e.Icon,
					new CommonTabTitleData_1.CommonTabTitleData(e.Name),
				)
			)),
			(this.CanToggleChange = () =>
				!!ModelManager_1.ModelManager.PlatformModel.IsGamepad() ||
				!this.cVe ||
				Time_1.Time.Now - this.cVe >= this.Zzt),
			(this.dUn = () => {
				var e = new HandBookQuestItem_1.HandBookQuestItem();
				return this.mUn.push(e), e;
			}),
			(this.aZt = (e, t) => e.Id - t.Id),
			(this.JSt = () => {
				this.CloseMe();
			}),
			(this.OnHandBookRead = (e, t) => {
				if (e === this.upt[this._Ve].Type) {
					var o = this.mUn.length;
					for (let e = 0; e < o; e++) {
						var n = this.mUn[e].GetChildItemList(),
							i = n.length;
						for (let e = 0; e < i; e++) {
							var a = n[e];
							if (a.GetData()?.ConfigId === t) return void a.SetNewState(!1);
						}
					}
				}
			}),
			(this.OnPhotoSelect = (e) => {
				for (const o of this.mUn)
					for (const n of o.GetChildItemList()) {
						var t = n.GetTog();
						n.GetData()?.ConfigId === e
							? t.SetToggleStateForce(1, !1, !0)
							: t.SetToggleStateForce(0, !1, !0);
					}
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIScrollViewWithScrollbarComponent],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIItem],
		];
	}
	async OnBeforeStartAsync() {
		this.CUn(), await this.InitCommonTabTitle();
	}
	OnStart() {
		this.cpt?.SetHelpButtonShowState(!1), this.Refresh(), this.AddEvent();
	}
	AddEvent() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnHandBookDataInit,
			this.Refresh,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnHandBookDataUpdate,
				this.Refresh,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnHandBookRead,
				this.OnHandBookRead,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPhotoSelect,
				this.OnPhotoSelect,
			);
	}
	RemoveEvent() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnHandBookDataInit,
			this.Refresh,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnHandBookDataUpdate,
				this.Refresh,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnHandBookRead,
				this.OnHandBookRead,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPhotoSelect,
				this.OnPhotoSelect,
			);
	}
	OnBeforeShow() {
		let e = !0;
		for (const o of this.mUn)
			for (const n of o.GetChildItemList()) {
				var t = n.GetTog();
				e && n.GetIsUnlock()
					? (t.SetToggleStateForce(1, !1, !0), (e = !1))
					: t.SetToggleStateForce(0, !1, !0);
			}
		this.cpt.SelectToggleByIndex(this._Ve);
	}
	async InitCommonTabTitle() {
		this.Zzt = CommonParamById_1.configCommonParamById.GetIntConfig(
			"panel_interval_time",
		);
		var e = new CommonTabComponentData_1.CommonTabComponentData(
			this.dVe,
			this.pqe,
			this.yqe,
		);
		(this.cpt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
			this.GetItem(0),
			e,
			this.JSt,
		)),
			this.cpt.SetCanChange(this.CanToggleChange),
			(e = this.upt.length),
			(e = this.cpt.CreateTabItemDataByLength(e));
		await this.cpt.RefreshTabItemAsync(e);
	}
	RefreshLoopScrollView() {
		this.KVe ||
			(this.KVe =
				ConfigManager_1.ConfigManager.HandBookConfig.GetPlotTypeConfigList());
		var e = [],
			t = this.upt[this._Ve].Type;
		for (const n of this.KVe)
			if (n.Type === t) {
				var o =
					ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(
						n.Id,
					);
				if (o) {
					let t = !0;
					for (const e of o) {
						t =
							void 0 ===
								ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
									n.Type,
									e.Id,
								) && t;
					}
					t || e.push(n);
				}
			}
		e.sort(this.aZt);
		var n = this.GetScrollViewWithScrollbar(1);
		this.GenericScroll ||
			(this.GenericScroll = new GenericScrollViewNew_1.GenericScrollViewNew(
				n,
				this.dUn,
				this.GetItem(3).GetOwner(),
			)),
			e.length <= 0
				? (this.GenericScroll.SetActive(!1), this.GetItem(4)?.SetUIActive(!0))
				: (this.GenericScroll.SetActive(!0),
					this.GetItem(4)?.SetUIActive(!1),
					this.GenericScroll.RefreshByData(e, () => {
						var e = this.GenericScroll?.GetItemByIndex(0);
						e && this.GenericScroll?.ScrollTo(e);
					}));
	}
	RefreshCollectText() {
		var e = HandBookController_1.HandBookController.GetCollectProgress(
			this.upt[this._Ve].Type,
		);
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "RoleExp", e[0], e[1]),
			this.GetText(2)?.SetUIActive(!1);
	}
	OnBeforeDestroy() {
		(this.RoleRootUiCameraHandleData = void 0),
			(this.GenericScroll = void 0),
			(this.KVe = []),
			(this.mUn = []),
			this.RemoveEvent();
	}
	CUn() {
		this.upt = ConfigManager_1.ConfigManager.HandBookConfig.GetQuestTabList();
	}
}
exports.HandBookQuestView = HandBookQuestView;
