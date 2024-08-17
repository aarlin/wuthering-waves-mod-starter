"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SignalItem = void 0);
const UE = require("ue"),
	MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	SignalItemBase_1 = require("./SignalItemBase"),
	NIAGARA_PARAM_NAME = "Dissolve",
	NIAGARA_YELLOW_COLOR = "FFFBE8FF",
	NIAGARA_RED_COLOR = "FFD6D6FF",
	NIAGARA_GREEN_COLOR = "E0FCDEFF",
	NIAGARA_ORANGE_COLOR = "FFBCA4FF";
class SignalItem extends SignalItemBase_1.SignalItemBase {
	constructor() {
		super(...arguments),
			(this.ngo = void 0),
			(this.pMo = void 0),
			(this.vMo = void 0),
			(this.MMo = void 0),
			(this.SMo = void 0),
			(this.EMo = void 0),
			(this.yMo = void 0),
			(this.IMo = void 0),
			(this.xxn = void 0),
			(this.LevelSequencePlayer = void 0),
			(this.ac = 0);
	}
	Init(e) {
		this.SetRootActor(e.GetOwner(), !0),
			(this.Width = this.RootItem.Width),
			(this.EMo = UE.Color.FromHex("E8CD74")),
			(this.IMo = UE.Color.FromHex("FF6A6A")),
			(this.yMo = UE.Color.FromHex("9DED87")),
			(this.xxn = UE.Color.FromHex("FF6827"));
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UINiagara],
			[2, UE.UINiagara],
			[3, UE.UISprite],
			[4, UE.UISprite],
		];
	}
	OnStart() {
		(this.ngo = this.GetSprite(0)),
			(this.pMo = this.GetSprite(4)),
			(this.vMo = this.GetUiNiagara(1)),
			(this.MMo = this.GetUiNiagara(2)),
			(this.SMo = this.GetSprite(3)),
			(this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.RootItem,
			));
	}
	OnReset() {
		this.ngo.SetFillAmount(1),
			this.ngo.SetAlpha(1),
			this.ngo.SetUIActive(!0),
			this.pMo.SetFillAmount(0);
		var e = ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType;
		let t = 2 === e ? this.yMo : this.EMo;
		3 === e && ((t = this.xxn), this.ngo.SetColor(t)),
			this.pMo.SetColor(t),
			this.ngo.SetAlpha(1),
			this.pMo.SetUIActive(!1),
			this.vMo?.SetUIActive(1 === e),
			this.vMo.SetUIItemScale(Vector_1.Vector.OneVector),
			this.vMo.SetAlpha(1),
			this.MMo.SetNiagaraVarFloat("Dissolve", 1),
			this.MMo.SetUIActive(!0),
			this.MMo.SetUIItemScale(Vector_1.Vector.OneVector),
			this.MMo.SetAlpha(1),
			this.TMo(),
			this.SMo.SetAlpha(0),
			(this.ac = 0);
	}
	InitByGameplayType(e) {
		super.InitByGameplayType(e);
		let t =
			2 === e ? "SP_SignalNoteSolidLineGreen" : "SP_SignalNoteSolidLineYellow";
		3 === e && (t = "SP_SignalNoteSolidLineOrange"),
			(e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t)),
			this.SetSpriteByPath(e, this.SMo, !1),
			this.Reset();
	}
	TMo() {
		let e = 2 === this.GameplayType ? "E0FCDEFF" : "FFFBE8FF";
		3 === this.GameplayType && (e = "FFBCA4FF"),
			this.MMo.SetColor(UE.Color.FromHex(e));
	}
	OnUpdate() {
		super.OnUpdate(), this.UpdateState(), 1 === this.ac && this.LMo();
	}
	UpdateState() {
		var e = -this.StartDecisionSize / 2;
		this.CurrentRelativeX < e
			? this.qxt(0)
			: ((this.EndDecisionSize / 2 < this.CurrentRelativeX - this.Width &&
					2 !== this.ac) ||
					((e = this.StartDecisionSize / 2),
					this.CurrentRelativeX > e && 0 === this.ac)) &&
				this.qxt(3);
	}
	qxt(e) {
		if (this.ac !== e)
			switch ((this.ac = e)) {
				case 1:
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnSignalCatchStart,
					);
					break;
				case 2:
					this.tMo(),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnSignalCatchSuccess,
						);
					break;
				case 3:
					this.oMo(),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnSignalCatchFailed,
						);
			}
	}
	LMo() {
		var e = this.GetProgress();
		this.MMo.SetNiagaraVarFloat("Dissolve", 1 - e),
			this.pMo.SetUIActive(!0),
			this.ngo.SetFillAmount(1 - e),
			this.pMo.SetFillAmount(e);
	}
	oMo() {
		switch (this.Type) {
			case 1:
				this.DMo();
				break;
			case 2:
				if (this.pMo.bIsUIActive)
					this.pMo.SetColor(this.IMo),
						this.MMo.SetColor(UE.Color.FromHex("FFD6D6FF"));
				else if (
					2 ===
					ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType
				) {
					this.DMo();
					break;
				}
				this.LevelSequencePlayer.PlayLevelSequenceByName("Trans");
		}
	}
	tMo() {
		this.MMo.SetNiagaraVarFloat("Dissolve", 0),
			this.MMo.SetUIActive(!0),
			this.vMo.SetUIActive(!1),
			this.ngo.SetUIActive(!1),
			this.pMo.SetUIActive(!1),
			this.SMo.SetAlpha(0);
	}
	OnCatchBtnDown() {
		super.OnCatchBtnDown(), 0 === this.ac && this.RMo() && this.qxt(1);
	}
	OnCatchBtnUp() {
		var e;
		super.OnCatchBtnUp(),
			1 === this.ac && ((e = this.UMo()), this.qxt(e ? 2 : 3));
	}
	RMo() {
		var e = -this.StartDecisionSize / 2,
			t = this.StartDecisionSize / 2;
		return this.RelativeXWhenCatchDown > e && this.RelativeXWhenCatchDown < t;
	}
	UMo() {
		var e = this.EndDecisionSize / 2,
			t = -this.EndDecisionSize / 2,
			i = this.RelativeXWhenCatchUp - this.Width;
		return t < i && i < e;
	}
	GetProgress() {
		var e = -this.DecisionShowSize / 2;
		e = this.CurrentRelativeX - e;
		return MathCommon_1.MathCommon.Clamp(e / this.Width, 0, 1);
	}
	GetCompleteness() {
		let e = 0;
		switch (this.ac) {
			case 1:
				e = this.GetProgress();
				break;
			case 2:
				e = 1;
				break;
			case 0:
			case 3:
				e = 0;
		}
		return e;
	}
	DMo() {
		this.pMo.SetUIActive(!1),
			this.MMo.SetUIActive(!1),
			this.vMo.SetUIActive(!1),
			this.ngo.SetUIActive(!1),
			this.SMo.SetAlpha(1);
	}
	TestCanBtnDown() {
		var e, t;
		return (
			0 === this.ac &&
			((e = -this.StartDecisionSize / 2),
			(t = this.StartDecisionSize / 2),
			this.CurrentRelativeX > e) &&
			this.CurrentRelativeX < t
		);
	}
	TestCanBtnUp() {
		var e, t;
		return (
			1 === this.ac &&
			((e = this.EndDecisionSize / 2),
			-this.EndDecisionSize / 2 < (t = this.CurrentRelativeX - this.Width)) &&
			t < e
		);
	}
}
exports.SignalItem = SignalItem;
