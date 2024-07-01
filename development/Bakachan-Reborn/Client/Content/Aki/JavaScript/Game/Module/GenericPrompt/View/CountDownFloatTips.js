"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CountDownFloatTips = void 0);
const UE = require("ue"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	GenericPromptFloatTipsBase_1 = require("./GenericPromptFloatTipsBase"),
	ONE_HUNDRED = 100;
class CountDownFloatTips extends GenericPromptFloatTipsBase_1.GenericPromptFloatTipsBase {
	constructor() {
		super(...arguments),
			(this.uYt = -0),
			(this.cYt = ""),
			(this.mYt = ""),
			(this.dYt = ""),
			(this.Lut = void 0),
			(this.LevelSequencePlayer = void 0),
			(this.P$t = (e, t) => {
				void 0 === (this.uYt = e) || e <= 0
					? (this.GetUiNiagara(2).SetUIActive(!1),
						this.GetUiNiagara(3).SetUIActive(!1),
						t && this.SetExtraText((t = "00"), t, t),
						(ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing =
							!0),
						this.CloseMe((e) => {
							e &&
								(ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing =
									!1);
						}))
					: (this.GetUiNiagara(2).SetUIActive(e <= 10),
						this.GetUiNiagara(3).SetUIActive(10 < e),
						(t = Math.floor(
							(e % TimeUtil_1.TimeUtil.Hour) / TimeUtil_1.TimeUtil.Minute,
						)),
						(this.mYt = (t < 10 ? "0" : "") + t),
						(t = Math.floor(e % TimeUtil_1.TimeUtil.Minute)),
						(this.dYt = (t < 10 ? "0" : "") + t),
						(t = Math.floor(100 * (e - Math.floor(e)))),
						(this.cYt = (t < 10 ? "0" : "") + t));
			});
	}
	OnRegisterComponent() {
		super.OnRegisterComponent(),
			this.ComponentRegisterInfos.push([2, UE.UINiagara]),
			this.ComponentRegisterInfos.push([3, UE.UINiagara]),
			(this.Lut = UE.Color.FromHex("FFFFFFFF"));
	}
	OnStart() {
		super.OnStart(),
			(this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.RootItem,
			));
	}
	OnAddEventListener() {
		super.OnAddEventListener(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnGamePlayCdChanged,
				this.P$t,
			);
	}
	OnRemoveEventListener() {
		super.OnRemoveEventListener(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnGamePlayCdChanged,
				this.P$t,
			);
	}
	OnTick(e) {
		this.mYt &&
			this.dYt &&
			this.cYt &&
			(this.uYt <= 10
				? "Loop" !== this.LevelSequencePlayer.GetCurrentSequence() &&
					this.LevelSequencePlayer.PlayLevelSequenceByName("Loop")
				: ("Loop" === this.LevelSequencePlayer.GetCurrentSequence() &&
						this.LevelSequencePlayer.StopCurrentSequence(),
					this.MainText.SetColor(this.Lut),
					this.ExtraText.SetColor(this.Lut),
					this.MainText.SetUIItemScale(Vector_1.Vector.OneVector),
					this.ExtraText.SetUIItemScale(Vector_1.Vector.OneVector)),
			0 === this.uYt && (this.cYt = "00"),
			this.SetExtraText(this.mYt, this.dYt, this.cYt));
	}
}
exports.CountDownFloatTips = CountDownFloatTips;
