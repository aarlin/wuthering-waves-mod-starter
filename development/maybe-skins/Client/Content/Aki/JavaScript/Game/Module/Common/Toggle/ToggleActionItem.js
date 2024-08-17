"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ToggleActionItem = void 0);
const UE = require("ue"),
	TickSystem_1 = require("../../../../Core/Tick/TickSystem"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../LevelSequencePlayer"),
	puerts_1 = require("puerts"),
	Global_1 = require("../../../Global"),
	FONT_SIZE = 38;
class ToggleActionItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.Toggle = void 0),
			(this.CHs = void 0),
			(this.izi = void 0),
			(this.Text = void 0),
			(this.ToggleIndexInline = 0),
			(this.LevelSequencePlayer = void 0),
			(this.U4e = void 0),
			(this.k9s = 0),
			(this.DefaultToggleItemHeight = 0),
			(this.F9s = void 0),
			(this.Rqe = void 0),
			(this.MHs = void 0),
			(this.gHs = !0),
			(this.J_ = () => {
				var e = this.SHs();
				(this.MHs?.X == e.X && this.MHs?.Y == e.Y) ||
					((this.MHs = e), this.fHs());
			}),
			(this.SHs = () => {
				var e = Global_1.Global.CharacterController,
					t = (0, puerts_1.$ref)(0),
					i = (0, puerts_1.$ref)(0);
				e.GetViewportSize(t, i),
					(e = (0, puerts_1.$unref)(t)),
					(t = (0, puerts_1.$unref)(i));
				return new UE.IntPoint(e, t);
			}),
			(this.ToggleClick = (e) => {
				this.U4e && this.U4e(e);
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	get ToggleIndex() {
		return this.ToggleIndexInline;
	}
	set ToggleIndex(e) {
		this.ToggleIndexInline = e;
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIExtendToggle],
			[2, UE.UITexture],
		]),
			(this.BtnBindInfo = [[1, this.ToggleClick]]);
	}
	OnStart() {
		this.Toggle = this.GetExtendToggle(1);
		var e = this.Toggle.GetOwner();
		(this.CHs = e.GetUIItem()),
			(this.izi = this.GetText(0)),
			(this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.RootItem,
			)),
			this.Toggle.SetToggleStateForce(0, !1, !0),
			(this.F9s = this.GetRootActor().GetComponentByClass(
				UE.UISizeControlByOther.StaticClass(),
			)),
			(e = this.GetText(0));
		(this.k9s = e.GetSize()),
			(this.DefaultToggleItemHeight = this.CHs.GetHeight()),
			(this.Rqe = TickSystem_1.TickSystem.Add(this.J_, "ToggleActionItemTick")),
			(this.MHs = this.SHs());
	}
	OnBeforeDestroy() {
		(this.Toggle = void 0),
			(this.Text = void 0),
			(this.izi = void 0),
			(this.CHs = void 0),
			this.LevelSequencePlayer && this.LevelSequencePlayer.Clear(),
			(this.LevelSequencePlayer = void 0),
			(this.F9s = void 0),
			this.Rqe &&
				(TickSystem_1.TickSystem.Remove(this.Rqe.Id), (this.Rqe = void 0));
	}
	ShowSequenceOnBegin() {
		this.LevelSequencePlayer.PlayLevelSequenceByName("show");
	}
	SetFunction(e) {
		this.U4e = e;
	}
	GetToggleItem() {
		return this.Toggle;
	}
	SetToggleText(e) {
		(this.Text = e), this.izi && (this.izi.SetText(e), this.fHs());
	}
	fHs() {
		var e;
		this.izi &&
			this.CHs &&
			(this.izi.GetRealSize(),
			(e = this.izi.GetRenderLineNum() < 2),
			this.gHs !== e) &&
			((this.gHs = e),
			this.gHs
				? (this.F9s?.SetControlHeight(!1),
					this.izi.SetFontSize(this.k9s),
					this.izi.GetRealSize(),
					this.izi.GetRenderLineNum() < 2 || this.izi.SetFontSize(38),
					this.CHs?.SetHeight(this.DefaultToggleItemHeight))
				: (this.izi.SetFontSize(38),
					this.izi.GetRealSize(),
					this.izi.GetRenderLineNum() < 2
						? this.F9s?.SetControlHeight(!1)
						: this.F9s?.SetControlHeight(!0)));
	}
	SetToggleTexture(e) {
		this.SetTextureByPath(e, this.GetTexture(2));
	}
	SetToggleTextGray(e) {
		this.GetText(0).SetIsGray(e);
	}
	GetToggleText() {
		return this.GetText(0);
	}
}
exports.ToggleActionItem = ToggleActionItem;
