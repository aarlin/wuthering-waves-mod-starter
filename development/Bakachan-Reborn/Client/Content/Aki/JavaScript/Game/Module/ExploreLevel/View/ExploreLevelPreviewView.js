"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreLevelPreviewView = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid"),
	HelpController_1 = require("../../Help/HelpController"),
	ItemController_1 = require("../../Item/ItemController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	ExploreLevelPreviewItem_1 = require("./ExploreLevelPreviewItem");
class ExploreLevelPreviewView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.f5t = void 0),
			(this.p5t = void 0),
			(this.v5t = void 0),
			(this.o5t = []),
			(this.M5t = 0),
			(this.cTn = void 0),
			(this.sRn = (t) => {
				(t = t.Data), ItemController_1.ItemController.OpenItemTipsByItemId(t);
			}),
			(this.YZe = () => {
				HelpController_1.HelpController.OpenHelpById(this.p5t.GetHelpId());
			}),
			(this.S5t = () => {
				this.M5t = Math.max(0, this.M5t - 1);
				var t = this.o5t[this.M5t];
				t && (this.E5t(t), this.dTn(t)), this.y5t();
			}),
			(this.I5t = () => {
				this.M5t = Math.min(this.M5t + 1, this.o5t.length - 1);
				var t = this.o5t[this.M5t];
				t && (this.E5t(t), this.dTn(t)), this.y5t();
			}),
			(this.T5t = () =>
				new ExploreLevelPreviewItem_1.ExploreLevelPreviewItem());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIButtonComponent],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UISprite],
			[6, UE.UILoopScrollViewComponent],
			[7, UE.UIItem],
			[8, UE.UISprite],
			[9, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[0, this.YZe],
				[1, this.S5t],
				[2, this.I5t],
			]);
	}
	async OnBeforeStartAsync() {
		(this.cTn = new SmallItemGrid_1.SmallItemGrid()),
			this.cTn.BindOnExtendToggleClicked(this.sRn),
			this.cTn.BindOnCanExecuteChange(() => !1),
			await this.cTn.CreateThenShowByActorAsync(this.GetItem(9).GetOwner());
	}
	OnStart() {
		var t = this.OpenParam;
		(t =
			((this.v5t = new LoopScrollView_1.LoopScrollView(
				this.GetLoopScrollViewComponent(6),
				this.GetItem(7).GetOwner(),
				this.T5t,
			)),
			(this.f5t = t),
			(this.o5t = this.f5t.GetUnlockFunctionExploreLevelRewardDataList()),
			(this.M5t = this.L5t(this.f5t.GetExploreLevel())),
			this.o5t[this.M5t])) && (this.E5t(t), this.dTn(t)),
			this.y5t(),
			this.D5t();
	}
	OnBeforeDestroy() {
		(this.f5t = void 0), this.v5t.ClearGridProxies(), (this.v5t = void 0);
	}
	L5t(t) {
		var e = this.o5t.length;
		for (let i = 0; i < e; i++) if (this.o5t[i].GetExploreLevel() > t) return i;
		for (let i = e - 1; 0 < i; i--)
			if (this.o5t[i].GetExploreLevel() < t) return i;
	}
	E5t(t) {
		var e, i, o;
		(this.p5t = t).IsShowUnlockSprite() &&
			(this.SetSpriteByPath(t.GetUnlockSpritePath(), this.GetSprite(5), !1),
			(e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				t.GetScoreNameId(),
			)),
			(i = this.GetText(4)),
			(o = t.GetExploreLevel() <= this.f5t.GetExploreLevel())
				? LguiUtil_1.LguiUtil.SetLocalTextNew(i, "ExploreUnlockRewardText", e)
				: LguiUtil_1.LguiUtil.SetLocalTextNew(i, "ExploreLockRewardText", e),
			this.GetSprite(8).SetUIActive(!o),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(3),
				t.GetRewardNameId(),
			));
	}
	dTn(t) {
		(t = t.GetPreviewItemConfigId()),
			this.cTn?.Apply({ Type: 4, Data: t, ItemConfigId: t });
	}
	y5t() {
		var t = this.o5t.length;
		this.SetButtonUiActive(2, this.M5t < t - 1),
			this.SetButtonUiActive(1, 0 < this.M5t);
	}
	D5t() {
		var t = this.f5t.GetAllExploreLevelRewardData().slice(1);
		this.v5t.ReloadData(t);
	}
}
exports.ExploreLevelPreviewView = ExploreLevelPreviewView;
