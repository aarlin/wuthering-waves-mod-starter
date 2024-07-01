"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoguelikeRoomFloatTips = void 0);
const UE = require("ue"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericPromptFloatTipsBase_1 = require("./GenericPromptFloatTipsBase");
class RoguelikeRoomFloatTips extends GenericPromptFloatTipsBase_1.GenericPromptFloatTipsBase {
	OnRegisterComponent() {
		super.OnRegisterComponent(),
			this.ComponentRegisterInfos.push([2, UE.UISprite]);
	}
	SetMainText() {
		var e =
			ModelManager_1.ModelManager.RoguelikeModel.CurRoomType ===
			Protocol_1.Aki.Protocol.f3s.Proto_Normal;
		this.MainText.SetUIActive(e),
			e &&
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.MainText,
					"RoguelikeRoomFloatTips_Normal",
					ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount,
					ModelManager_1.ModelManager.RoguelikeModel.TotalRoomCount,
				);
	}
	SetExtraText() {
		switch (ModelManager_1.ModelManager.RoguelikeModel.CurRoomType) {
			case Protocol_1.Aki.Protocol.f3s.Proto_Normal:
				this.GetSprite(2).SetUIActive(!1),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.ExtraText,
						"RoguelikeRoomFloatTips_NormalDesc",
					);
				break;
			case Protocol_1.Aki.Protocol.f3s.Proto_Boss:
				this.SetSpriteByPath(
					CommonParamById_1.configCommonParamById.GetStringConfig(
						"RoguelikeRoomFloatTips_NoHeadIcon",
					),
					this.GetSprite(2),
					!1,
				),
					this.GetSprite(2).SetUIActive(!1),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.ExtraText,
						"RoguelikeRoomFloatTips_NoHeadDesc",
					);
				break;
			case Protocol_1.Aki.Protocol.f3s.Proto_Special:
				this.SetSpriteByPath(
					CommonParamById_1.configCommonParamById.GetStringConfig(
						"RoguelikeRoomFloatTips_SpecialIcon",
					),
					this.GetSprite(2),
					!1,
				),
					this.GetSprite(2).SetUIActive(!1),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.ExtraText,
						"RoguelikeRoomFloatTips_SpecialDesc",
					);
		}
	}
}
exports.RoguelikeRoomFloatTips = RoguelikeRoomFloatTips;
