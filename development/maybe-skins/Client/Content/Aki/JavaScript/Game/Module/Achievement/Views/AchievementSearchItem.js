"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementSearchItem = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	DynScrollView_1 = require("../../Util/ScrollView/DynScrollView"),
	AchievementSearchResultDynItem_1 = require("./AchievementSearchResultDynItem"),
	AchievementSearchResultItem_1 = require("./AchievementSearchResultItem");
class AchievementSearchItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.xqe = void 0),
			(this.dGe = void 0),
			(this.CGe = !1),
			(this.gGe = ""),
			(this.wqe = void 0),
			(this.fGe = (e, t, n) =>
				new AchievementSearchResultItem_1.AchievementSearchResultItem()),
			(this.pGe = () => {
				ModelManager_1.ModelManager.AchievementModel.AchievementSearchState &&
					this.vGe();
			}),
			(this.Hbe = () => {
				ModelManager_1.ModelManager.AchievementModel.RefreshSearchResult(),
					this.Hqe();
			}),
			(this.wqe = e);
	}
	async Init() {
		await this.CreateByActorAsync(this.wqe.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIDynScrollViewComponent],
			[1, UE.UIItem],
		];
	}
	async OnBeforeStartAsync() {
		(this.dGe =
			new AchievementSearchResultDynItem_1.AchievementSearchResultDynItem()),
			(this.xqe = new DynScrollView_1.DynamicScrollView(
				this.GetUIDynScrollViewComponent(0),
				this.GetItem(1),
				this.dGe,
				this.fGe,
			)),
			await this.xqe.Init();
	}
	OnStart() {
		this.GetUIDynScrollViewComponent(0)
			.GetRootComponent()
			.SetUIActive(this.CGe),
			this.AddEventListener();
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnGetAchievementSearchTextChange,
			this.pGe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAchievementDataNotify,
				this.Hbe,
			);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnGetAchievementSearchTextChange,
			this.pGe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAchievementDataNotify,
				this.Hbe,
			);
	}
	OnBeforeDestroy() {
		this.xqe && (this.xqe.ClearChildren(), (this.xqe = void 0)),
			this.dGe && (this.dGe.ClearItem(), (this.dGe = void 0)),
			this.RemoveEventListener();
	}
	Update() {
		this.vGe();
	}
	ResetSearchState() {
		this.gGe = "";
	}
	vGe() {
		var e = ModelManager_1.ModelManager.AchievementModel.CurrentSearchText;
		this.gGe !== e && this.Hqe();
	}
	Hqe() {
		var e,
			t,
			n = ModelManager_1.ModelManager.AchievementModel;
		n.AchievementSearchState &&
			((t = n.CurrentSearchText),
			(e = n.GetSearchResult()),
			(this.gGe = t),
			(t = n.GetSearchResultIfNull()),
			this.GetUIDynScrollViewComponent(0).GetRootComponent().SetUIActive(!t),
			(this.CGe = !t),
			(t = n.GetSearchResultData(e)),
			(n.CurrentCacheSearchData = t),
			this.xqe.RefreshByData(t));
	}
}
exports.AchievementSearchItem = AchievementSearchItem;
