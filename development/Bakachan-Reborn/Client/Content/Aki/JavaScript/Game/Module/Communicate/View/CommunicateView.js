"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommunicateView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	CommunicateById_1 = require("../../../../Core/Define/ConfigQuery/CommunicateById"),
	SpeakerById_1 = require("../../../../Core/Define/ConfigQuery/SpeakerById"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../../Common/PublicUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	GuideCountDownItem_1 = require("../../Guide/Views/GuideCountDownItem"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class CommunicateView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.ZBt = void 0),
			(this.ebt = 0),
			(this.tbt = 0),
			(this.ibt = !1),
			(this.obt = 0),
			(this.nbt = () => {
				this.$Oe((e) => {
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.CommunicateFinished,
						this.obt,
					);
				});
			}),
			(this.$Oe = (e) => {
				this.CloseMe(e);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UITexture],
			[3, UE.UIItem],
			[4, UE.UIText],
			[5, UE.UIButtonComponent],
			[6, UE.UIItem],
		]),
			(this.BtnBindInfo = [[5, this.nbt]]);
	}
	OnStart() {
		var e,
			t = this.GetText(4);
		t.SetRichText(!0),
			t.SetHeight(100),
			LguiUtil_1.LguiUtil.SetLocalText(t, "QuestCommunicateConnect"),
			(this.ebt = CommonParamById_1.configCommonParamById.GetIntConfig(
				"CommunicateViewCloseTime",
			)),
			(this.tbt = this.ebt),
			(this.ZBt = new GuideCountDownItem_1.GuideCountDownItem(this.ebt)),
			this.ZBt.Init(this.GetItem(0)),
			(this.obt = this.OpenParam),
			this.obt &&
				((t = CommunicateById_1.configCommunicateById.GetConfig(this.obt))
					? (e = SpeakerById_1.configSpeakerById.GetConfig(t.Talker))
						? (this.hbt(e), this.lbt(e))
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error("Quest", 19, "找不到通讯对话人配置", [
								"talkerId",
								t.Talker,
							])
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("Quest", 19, "找不到通讯配置", [
							"communicateId",
							this.obt,
						]));
	}
	hbt(e) {
		var t = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
				"QuestCommunicateRequest",
			),
			i = this.GetText(1);
		e = PublicUtil_1.PublicUtil.GetConfigTextByTable(0, e.Id);
		i.SetText(`【${e}】` + t);
	}
	lbt(e) {
		var t = this.GetTexture(2);
		this.SetTextureByPath(e.HeadIconAsset, t);
	}
	OnTick(e) {
		this.RootItem.bIsUIActive &&
			(this.tbt <= 0 && !this.ibt
				? ((this.ibt = !0), this.$Oe())
				: ((this.tbt -= e), this.ZBt.OnDurationChange(this.tbt)));
	}
}
exports.CommunicateView = CommunicateView;
