"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreLevelPreviewItem = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
class ExploreLevelPreviewItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.bOe = void 0),
			(this.g5t = (e, t, r) => {
				var i = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
				return (
					i.Initialize(t.GetOwner()),
					i.RefreshByConfigId(e[0], e[1]),
					{ Key: r, Value: i }
				);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UISprite],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIScrollViewWithScrollbarComponent],
			[5, UE.UISprite],
			[6, UE.UIText],
		];
	}
	OnStart() {
		this.bOe = new GenericScrollView_1.GenericScrollView(
			this.GetScrollViewWithScrollbar(4),
			this.g5t,
		);
	}
	OnBeforeDestroy() {
		this.bOe = void 0;
	}
	Refresh(e, t, r) {
		var i = [];
		if ((a = e.GetDropItemNumMap())) for (var [o, l] of a) i.push([o, l]);
		this.bOe.RefreshByData(i),
			this.SetTextureByPath(e.GetScoreTexturePath(), this.GetTexture(0));
		var a =
				ModelManager_1.ModelManager.ExploreLevelModel.GetCurrentCountryExploreLevelData().GetExploreLevel() >=
				e.GetExploreLevel(),
			n =
				((a =
					(this.GetSprite(1).SetUIActive(a),
					this.GetText(2).SetUIActive(!a),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(3),
						e.GetScoreNameId(),
					),
					e.GetRewardNameId())),
				this.GetText(6));
		a
			? ((a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a)),
				LguiUtil_1.LguiUtil.SetLocalTextNew(n, "ExploreUnlockPreviewText", a),
				n.SetUIActive(!0))
			: n.SetUIActive(!1),
			this.GetSprite(5).SetUIActive(e.IsShowUnlockSprite());
	}
}
exports.ExploreLevelPreviewItem = ExploreLevelPreviewItem;
