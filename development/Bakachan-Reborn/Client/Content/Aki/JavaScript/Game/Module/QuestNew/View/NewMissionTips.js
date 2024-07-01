"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NewMissionTips = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	PublicUtil_1 = require("../../../Common/PublicUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils");
class NewMissionTips extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.dro = ""),
			(this.Cro = ""),
			(this.mNe = 5),
			(this.gro = !1),
			(this.fro = () => {
				var e = PublicUtil_1.PublicUtil.GetConfigTextByKey(this.Cro);
				this.GetText(0)?.SetText(e);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UISprite],
		];
	}
	OnBeforeCreate() {
		super.OnBeforeCreate();
		var e = this.OpenParam,
			i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
		i
			? ((this.dro =
					ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMark(
						i.QuestMarkId,
					) ?? ""),
				(this.Cro = i.QuestNameTid),
				(this.mNe =
					ConfigManager_1.ConfigManager.QuestNewConfig.GetNewTipsShowTime(
						i.Type,
					) ?? 0))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Quest",
					19,
					"Quest:NewMissionTips.OnBeforeCreate 找不到任务",
					["questId", e],
				);
	}
	OnStart() {
		var e;
		super.OnStart(),
			(e =
				((e = this.GetSprite(1)) &&
					!StringUtils_1.StringUtils.IsBlank(this.dro) &&
					(this.SetSpriteByPath(this.dro, e, !1), e.SetUIActive(!0)),
				this.GetText(0))).OnSelfLanguageChange.Bind(this.fro),
			this.fro(),
			e.SetUIActive(!0);
	}
	OnTick(e) {
		(this.mNe = Math.max(this.mNe - (e / 1e3) * Time_1.Time.TimeDilation, 0)),
			this.mNe <= 0 && !this.gro && this.$Oe();
	}
	$Oe() {
		(this.gro = !0), this.CloseMe();
	}
}
exports.NewMissionTips = NewMissionTips;
