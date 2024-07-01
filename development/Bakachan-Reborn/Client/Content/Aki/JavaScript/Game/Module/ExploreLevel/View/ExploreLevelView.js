"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreLevelView = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
	ExploreProgressController_1 = require("../../ExploreProgress/ExploreProgressController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	ExploreLevelController_1 = require("../ExploreLevelController"),
	ExploreLevelItem_1 = require("./ExploreLevelItem"),
	PLAY_PROGRESS_BAR_TIME = 300;
class ExploreLevelView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.f5t = void 0),
			(this.R5t = void 0),
			(this.bOe = void 0),
			(this.U5t = void 0),
			(this.mTn = 0),
			(this.CTn = 0),
			(this.gTn = 0),
			(this.fTn = 0),
			(this.vTn = 0),
			(this.pTn = 0),
			(this.MTn = 0),
			(this.ETn = !1),
			(this.aRn = !1),
			(this.JSt = () => {
				UiManager_1.UiManager.CloseView("ExploreLevelView");
			}),
			(this.A5t = () => {}),
			(this.P5t = () => {
				this.w5t();
				var e = this.f5t.GetExploreScore(),
					t = this.R5t.GetMaxExploreScore();
				t < 0 ? this.x5t() : this.STn(this.mTn, this.CTn, e, t);
			}),
			(this.B5t = () => {
				(this.f5t =
					ModelManager_1.ModelManager.ExploreLevelModel.GetCurrentCountryExploreLevelData()),
					(this.R5t = this.f5t.GetCurrentExploreLevelRewardData());
				var e = this.f5t.GetExploreScore(),
					t = this.R5t.GetMaxExploreScore();
				t < 0 ? this.x5t() : this.STn(this.mTn, this.CTn, e, t);
			}),
			(this.UKe = (e, t) => {
				"ExploreLevelRewardView" === e && this.hRn(!0);
			}),
			(this.$Ge = (e, t) => {
				"ExploreLevelRewardView" === e && this.hRn(!1);
			}),
			(this.g5t = (e, t, i) => {
				var r = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
				return (
					r.Initialize(t.GetOwner()),
					r.RefreshByConfigId(e[0], e[1]),
					{ Key: i, Value: r }
				);
			}),
			(this.q5t = () => {
				var e = new ExploreLevelItem_1.ExploreLevelItem();
				return e.BindOnClickedReceiveButton(this.C5t), e;
			}),
			(this.C5t = (e) => {
				var t = e.AreaId,
					i = e.Progress;
				ExploreLevelController_1.ExploreLevelController.ExploreScoreRewardRequest(
					t,
					i,
				),
					ExploreLevelController_1.ExploreLevelController.CountryExploreScoreInfoRequest(
						e.CountryId,
						() => {
							e.GetIsReceived() ||
								((this.mTn = this.f5t.GetExploreScore()),
								(this.CTn = this.R5t.GetMaxExploreScore()),
								this.lRn());
						},
					);
			}),
			(this.G5t = () => {
				UiManager_1.UiManager.OpenView(
					"ExploreLevelPreviewView",
					this.f5t,
					(e, t) => {
						e && this.AddChildViewById(t);
					},
				);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UITexture],
			[2, UE.UISprite],
			[3, UE.UITexture],
			[4, UE.UIText],
			[5, UE.UIScrollViewWithScrollbarComponent],
			[6, UE.UIButtonComponent],
			[7, UE.UIText],
			[8, UE.UILoopScrollViewComponent],
			[9, UE.UIItem],
			[10, UE.UIButtonComponent],
			[11, UE.UIItem],
			[12, UE.UIText],
			[13, UE.UIItem],
			[14, UE.UINiagara],
		]),
			(this.BtnBindInfo = [
				[6, this.G5t],
				[10, this.JSt],
			]);
	}
	async OnBeforeStartAsync() {
		(this.f5t =
			ModelManager_1.ModelManager.ExploreLevelModel.GetCurrentCountryExploreLevelData()),
			(this.R5t = this.f5t.GetCurrentExploreLevelRewardData()),
			await Promise.all([
				ExploreProgressController_1.ExploreProgressController.AllExploreProgressAsyncRequest(),
				ExploreLevelController_1.ExploreLevelController.CountryExploreScoreInfoAsyncRequest(
					this.f5t.GetCountryId(),
				),
			]);
	}
	OnStart() {
		(this.bOe = new GenericScrollView_1.GenericScrollView(
			this.GetScrollViewWithScrollbar(5),
			this.g5t,
		)),
			(this.U5t = new LoopScrollView_1.LoopScrollView(
				this.GetLoopScrollViewComponent(8),
				this.GetItem(9).GetOwner(),
				this.q5t,
			)),
			this.b5t(),
			this.x5t(),
			this.w5t();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnExploreScoreRewardResponse,
			this.A5t,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnCountryExploreScoreInfoResponse,
				this.P5t,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnExploreLevelNotify,
				this.B5t,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OpenView,
				this.UKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnExploreScoreRewardResponse,
			this.A5t,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnCountryExploreScoreInfoResponse,
				this.P5t,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnExploreLevelNotify,
				this.B5t,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OpenView,
				this.UKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			);
	}
	OnBeforeDestroy() {
		this.bOe.ClearChildren(),
			(this.bOe = void 0),
			this.U5t.ClearGridProxies(),
			(this.U5t = void 0),
			(this.f5t = void 0);
	}
	OnTick(e) {
		if (this.ETn && !this.aRn)
			if (this.vTn < this.gTn) {
				const t = MathUtils_1.MathUtils.Lerp(
					this.gTn,
					this.fTn,
					this.MTn / 300,
				);
				this.TTn(t, this.fTn),
					t >= this.fTn && this.STn(0, this.pTn, this.vTn, this.pTn),
					(this.MTn += e);
			} else {
				const t = MathUtils_1.MathUtils.Lerp(
					this.gTn,
					this.vTn,
					this.MTn / 300,
				);
				this.TTn(t, this.pTn),
					this.MTn >= 300
						? (this.b5t(), this.x5t(), this.LTn())
						: (this.MTn += e);
			}
	}
	STn(e, t, i, r) {
		(this.gTn = e),
			(this.fTn = t),
			(this.vTn = i),
			(this.pTn = r),
			(this.MTn = 0),
			(this.ETn = !0);
	}
	hRn(e) {
		this.aRn = e;
	}
	LTn() {
		(this.ETn = !1), (this.MTn = 0);
	}
	lRn() {
		var e = this.GetUiNiagara(14);
		e.IsUIActiveSelf() ? e.ActivateSystem(!0) : e.SetUIActive(!0);
	}
	b5t() {
		this.Lht(), this.k5t(), this.F5t();
	}
	Lht() {
		var e = this.R5t.GetScoreNameId();
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), e);
	}
	k5t() {
		var e = this.R5t.GetScoreTexturePath(),
			t = this.GetTexture(1);
		this.SetTextureByPath(e, t);
	}
	x5t() {
		var e,
			t = this.R5t.GetMaxExploreScore();
		t <= 0
			? this.GetItem(11)?.SetUIActive(!1)
			: ((e = this.f5t.GetExploreScore()),
				this.TTn(e, t),
				this.SetTextureByPath(
					ModelManager_1.ModelManager.ExploreLevelModel
						.ExploreScoreItemTexturePath,
					this.GetTexture(3),
				),
				this.GetItem(11)?.SetUIActive(!0));
	}
	TTn(e, t) {
		(e = Math.floor(Math.min(t, e))),
			(t = Math.floor(t)),
			this.GetSprite(2).SetFillAmount(e / t),
			this.GetText(4).SetText(e + "/" + t);
	}
	F5t() {
		if (
			(e = this.f5t.GetExploreLevelRewardData(this.R5t.GetExploreLevel() + 1))
		) {
			var e,
				t = [];
			if ((e = e.GetDropItemNumMap())) for (var [i, r] of e) t.push([i, r]);
			this.bOe.RefreshByData(t), this.GetItem(13).SetUIActive(!1);
		} else
			this.bOe.ClearChildren(),
				this.bOe.SetActive(!1),
				this.GetItem(13).SetUIActive(!0);
	}
	w5t() {
		var e = this.f5t.GetVisibleExploreScoreDataList();
		e.sort((e, t) => {
			var i = e.GetIsReceived() ? 1 : 0,
				r = t.GetIsReceived() ? 1 : 0;
			return i != r ||
				(i = e.CanReceive() ? -1 : 0) != (r = t.CanReceive() ? -1 : 0) ||
				(i = e.AreaId) !== (r = t.AreaId) ||
				(i = e.Progress) !== (r = t.Progress)
				? i - r
				: 0;
		}),
			this.U5t.ReloadData(e);
	}
}
exports.ExploreLevelView = ExploreLevelView;
