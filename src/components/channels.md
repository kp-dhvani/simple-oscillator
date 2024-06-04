### Up-mixing and down-mixing

When the numbers of channels of the input and the output don't match, up-mixing, or down-mixing, must be done. The following rules, controlled by setting the {{domxref("AudioNode.channelInterpretation")}} property to `speakers` or `discrete`, apply:

<table class="standard-table">
  <thead>
    <tr>
      <th scope="row">Interpretation</th>
      <th scope="col">Input channels</th>
      <th scope="col">Output channels</th>
      <th scope="col">Mixing rules</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="13" scope="row"><code>speakers</code></th>
      <td><code>1</code> <em>(Mono)</em></td>
      <td><code>2</code> <em>(Stereo)</em></td>
      <td>
        <em>Up-mix from mono to stereo</em>.<br />The <code>M</code> input
        channel is used for both output channels (<code>L</code> and
        <code>R</code>).<br /><code
          >output.L = input.M<br />output.R = input.M</code
        >
      </td>
    </tr>
    <tr>
      <td><code>1</code> <em>(Mono)</em></td>
      <td><code>4</code> <em>(Quad)</em></td>
      <td>
        <em>Up-mix from mono to quad.</em><br />The <code>M</code> input channel
        is used for non-surround output channels (<code>L</code> and
        <code>R</code>). Surround output channels (<code>SL</code> and
        <code>SR</code>) are silent.<br /><code
          >output.L = input.M<br />output.R = input.M<br />output.SL = 0<br />output.SR
          = 0</code
        >
      </td>
    </tr>
    <tr>
      <td><code>1</code> <em>(Mono)</em></td>
      <td><code>6</code> <em>(5.1)</em></td>
      <td>
        <em>Up-mix from mono to 5.1.</em><br />The <code>M</code> input channel
        is used for the center output channel (<code>C</code>). All the others
        (<code>L</code>, <code>R</code>, <code>LFE</code>, <code>SL</code>, and
        <code>SR</code>) are silent.<br /><code
          >output.L = 0<br />output.R = 0</code
        ><br /><code
          >output.C = input.M<br />output.LFE = 0<br />output.SL = 0<br />output.SR
          = 0</code
        >
      </td>
    </tr>
    <tr>
      <td><code>2</code> <em>(Stereo)</em></td>
      <td><code>1</code> <em>(Mono)</em></td>
      <td>
        <em>Down-mix from stereo to mono</em>.<br />Both input channels (<code
          >L</code
        >
        and <code>R</code>) are equally combined to produce the unique output
        channel (<code>M</code>).<br /><code
          >output.M = 0.5 * (input.L + input.R)</code
        >
      </td>
    </tr>
    <tr>
      <td><code>2</code> <em>(Stereo)</em></td>
      <td><code>4</code> <em>(Quad)</em></td>
      <td>
        <em>Up-mix from stereo to quad.</em><br />The <code>L</code> and
        <code>R </code>input channels are used for their non-surround respective
        output channels (<code>L</code> and <code>R</code>). Surround output
        channels (<code>SL</code> and <code>SR</code>) are silent.<br /><code
          >output.L = input.L<br />output.R = input.R<br />output.SL = 0<br />output.SR
          = 0</code
        >
      </td>
    </tr>
    <tr>
      <td><code>2</code> <em>(Stereo)</em></td>
      <td><code>6</code> <em>(5.1)</em></td>
      <td>
        <em>Up-mix from stereo to 5.1.</em><br />The <code>L</code> and
        <code>R </code>input channels are used for their non-surround respective
        output channels (<code>L</code> and <code>R</code>). Surround output
        channels (<code>SL</code> and <code>SR</code>), as well as the center
        (<code>C</code>) and subwoofer (<code>LFE</code>) channels, are left
        silent.<br /><code
          >output.L = input.L<br />output.R = input.R<br />output.C = 0<br />output.LFE
          = 0<br />output.SL = 0<br />output.SR = 0</code
        >
      </td>
    </tr>
    <tr>
      <td><code>4</code> <em>(Quad)</em></td>
      <td><code>1</code> <em>(Mono)</em></td>
      <td>
        <em>Down-mix from quad to mono</em>.<br />All four input channels
        (<code>L</code>, <code>R</code>, <code>SL</code>, and <code>SR</code>)
        are equally combined to produce the unique output channel
        (<code>M</code>).<br /><code
          >output.M = 0.25 * (input.L + input.R + </code
        ><code>input.SL + input.SR</code><code>)</code>
      </td>
    </tr>
    <tr>
      <td><code>4</code> <em>(Quad)</em></td>
      <td><code>2</code> <em>(Stereo)</em></td>
      <td>
        <em>Down-mix from quad to stereo</em>.<br />Both left input channels
        (<code>L</code> and <code>SL</code>) are equally combined to produce the
        unique left output channel (<code>L</code>). And similarly, both right
        input channels (<code>R</code> and <code>SR</code>) are equally combined
        to produce the unique right output channel (<code>R</code>).<br /><code
          >output.L = 0.5 * (input.L + input.SL</code
        ><code>)</code><br /><code>output.R = 0.5 * (input.R + input.SR</code
        ><code>)</code>
      </td>
    </tr>
    <tr>
      <td><code>4</code> <em>(Quad)</em></td>
      <td><code>6</code> <em>(5.1)</em></td>
      <td>
        <em>Up-mix from quad to 5.1.</em><br />The <code>L</code>,
        <code>R</code>, <code>SL</code>, and <code>SR</code> input channels are
        used for their respective output channels (<code>L</code> and
        <code>R</code>). Center (<code>C</code>) and subwoofer
        (<code>LFE</code>) channels are left silent.<br /><code
          >output.L = input.L<br />output.R = input.R<br />output.C = 0<br />output.LFE
          = 0<br />output.SL = input.SL<br />output.SR = input.SR</code
        >
      </td>
    </tr>
    <tr>
      <td><code>6</code> <em>(5.1)</em></td>
      <td><code>1</code> <em>(Mono)</em></td>
      <td>
        <em>Down-mix from 5.1 to mono.</em><br />The left (<code>L</code> and
        <code>SL</code>), right (<code>R</code> and <code>SR</code>) and central
        channels are all mixed together. The surround channels are slightly
        attenuated, and the regular lateral channels are power-compensated to
        make them count as a single channel by multiplying by <code>√2/2</code>.
        The subwoofer (<code>LFE</code>) channel is lost.<br /><code
          >output.M = 0.7071 * (input.L + input.R) + input.C + 0.5 * (input.SL +
          input.SR)</code
        >
      </td>
    </tr>
    <tr>
      <td><code>6</code> <em>(5.1)</em></td>
      <td><code>2</code> <em>(Stereo)</em></td>
      <td>
        <em>Down-mix from 5.1 to stereo.</em><br />The central channel
        (<code>C</code>) is summed with each lateral surround channel (<code
          >SL</code
        >
        or <code>SR</code>) and mixed to each lateral channel. As it is mixed
        down to two channels, it is mixed at a lower power: in each case, it is
        multiplied by <code>√2/2</code>. The subwoofer (<code>LFE</code>)
        channel is lost.<br /><code
          >output.L = input.L + 0.7071 * (input.C + input.SL)<br />output.R =
          input.R </code
        ><code>+ 0.7071 * (input.C + input.SR)</code>
      </td>
    </tr>
    <tr>
      <td><code>6</code> <em>(5.1)</em></td>
      <td><code>4</code> <em>(Quad)</em></td>
      <td>
        <em>Down-mix from 5.1 to quad.</em><br />The central (<code>C</code>) is
        mixed with the lateral non-surround channels (<code>L</code> and
        <code>R</code>). As it is mixed down to two channels, it is mixed at a
        lower power: in each case, it is multiplied by <code>√2/2</code>. The
        surround channels are passed unchanged. The subwoofer (<code>LFE</code>)
        channel is lost.<br /><code
          >output.L = input.L + 0.7071 * input.C<br />output.R = input.R +
          0.7071 * input.C<br />output.SL = input.SL<br />output.SR =
          input.SR</code
        >
      </td>
    </tr>
    <tr>
      <td colspan="2">Other, non-standard layouts</td>
      <td>
        Non-standard channel layouts behave as if
        <code>channelInterpretation</code> is set to
        <code>discrete</code>.<br />The specification explicitly allows the future definition of new speaker layouts. Therefore, this fallback is not future-proof as the behavior of the browsers for a specific number of channels may change in the future.
      </td>
    </tr>
    <tr>
      <th rowspan="2" scope="row"><code>discrete</code></th>
      <td>any (<code>x</code>)</td>
      <td>any (<code>y</code>) where <code>x&#x3C;y</code></td>
      <td>
        <em>Up-mix discrete channels.</em><br />Fill each output channel with
        its input counterpart &mdash; that is, the input channel with the same index.
        Channels with no corresponding input channels are left silent.
      </td>
    </tr>
    <tr>
      <td>any (<code>x</code>)</td>
      <td>any (<code>y</code>) where <code>x>y</code></td>
      <td>
        <em>Down-mix discrete channels.</em><br />Fill each output channel with
        its input counterpart &mdash; that is, the input channel with the same index.
        Input channels with no corresponding output channels are dropped.
      </td>
    </tr>
  </tbody>
</table>s
